import { h } from 'preact'
import { useEffect, useMemo } from 'preact/hooks'
import { renderText, renderURL, renderBugReportURL } from '../../common/js/util'
import { loadConfig } from '../js/repository'

type MusicInfo = { artist: string; title: string }

// Web Share Target API の title パラメータをパースし, 曲情報に変換する.
// 曲情報に複数通りの可能性があるならその全てからなるリストを, 1つもない場合は空のリストを返す.
function parseTitle(titleParam: string | null): MusicInfo[] {
  // `titleParam` は "小倉唯のHoney Come!!をチェック" のような形式になっている
  if (titleParam === null || !titleParam.endsWith('をチェック')) return []

  const tailedTitle = titleParam.slice(0, -5)

  // 'の' を基準にアーティスト名と曲名を分ける.
  // 'の' が複数ある場合はその全通りを返す.
  function splitTailedTitle(fromIndex: number): MusicInfo[] {
    const index = tailedTitle.indexOf('の', fromIndex)
    if (index === -1) return []
    return [
      {
        artist: tailedTitle.slice(0, index),
        title: tailedTitle.slice(index + 1),
      },
      ...splitTailedTitle(index + 1),
    ]
  }

  return splitTailedTitle(0)
}

type RenderedMusicInfo = MusicInfo & {
  text: string
  url: string
}

function useRenderedMusicInfoPatterns(
  template: string,
  hashtags: string,
): RenderedMusicInfo[] {
  const titleParam = new URLSearchParams(location.search).get('title')

  const patterns = useMemo(() => {
    return parseTitle(titleParam).map((musicInfo) => {
      const text = renderText(template, musicInfo)
      const url = renderURL(text, hashtags)
      return {
        ...musicInfo,
        text,
        url,
      }
    })
  }, [template, hashtags, titleParam])

  return patterns
}

export function Share() {
  const config = loadConfig()
  const patterns = useRenderedMusicInfoPatterns(
    config.gpmTemplate,
    config.hashtags,
  )

  useEffect(() => {
    if (patterns.length === 1) location.href = patterns[0].url
  }, [patterns])

  if (patterns.length === 0) {
    return (
      <div class="container" style={{ maxWidth: '80rem' }}>
        <p>共有に失敗しました. 共有の方法をもう一度見直して下さい.</p>
        <p>
          アプリの不具合だと思われる場合は, Twitterで開発者に報告できます.
          報告していただいた内容は今後のアプリの改善に役立てられます.
        </p>
        <div>
          <a class="button" href={renderBugReportURL({ config, patterns })}>
            Twitterで開発者に不具合を報告
          </a>
        </div>
      </div>
    )
  }

  if (patterns.length === 1) {
    return (
      <div class="container" style={{ maxWidth: '80rem' }}>
        Twitterを開いています. 自動で開かない場合は以下のボタンを押して下さい.
        <a class="button" href={patterns[0].url}>
          Twitterを開いて共有
        </a>
      </div>
    )
  }

  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      <p>
        曲情報の自動判別に失敗しました. 正しい曲情報を以下から選択して下さい.
      </p>
      <ol class="pattern-list">
        {patterns.map((pattern, index) => (
          <li>
            <a class="pattern-link" href={pattern.url}>
              <div class="pattern-link-text">
                <div class="pattern-index">{`${index + 1}. `}</div>
                <div>{pattern.text}</div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </div>
  )
}
