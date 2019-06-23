import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import {
  DEFAULT_TEMPLATE,
  DEFAULT_HASHTAGS,
  renderText,
  renderURL,
} from '../../common/js/util'

type ArtistWithTitle = { artist: string; title: string }

// Web Share Target API の title パラメータをパースし, アーティスト名と曲名の組に変換する.
// 可能性のある組が複数通りあるならその全てからなるリストを, 1つもない場合は空のリストを返す.
function parseTitle(titleParam: string | null): ArtistWithTitle[] {
  if (titleParam === null || !titleParam.endsWith('をチェック')) return []

  const tailedTitle = titleParam.slice(0, -5)

  // 'の' を基準にアーティスト名と曲名を分ける.
  // 'の' が複数ある場合はその全通りを返す.
  function separateIntoVariables(fromIndex: number): ArtistWithTitle[] {
    const index = tailedTitle.indexOf('の', fromIndex)
    if (index === -1) return []
    return [
      {
        artist: tailedTitle.slice(0, index),
        title: tailedTitle.slice(index + 1),
      },
      ...separateIntoVariables(index + 1),
    ]
  }

  // `titleParam` は "小倉唯のHoney Come!!をチェック" のような形式になっている
  return separateIntoVariables(0)
}

export function Share() {
  const titleParam = new URLSearchParams(location.search).get('title')
  const patterns = parseTitle(titleParam).map((variable) => {
    const text = renderText(DEFAULT_TEMPLATE, variable.title, variable.artist)
    const url = renderURL(text, DEFAULT_HASHTAGS)
    return {
      ...variable,
      text,
      url,
    }
  })

  useEffect(() => {
    if (patterns.length === 1) location.href = patterns[0].url
  }, [titleParam])

  if (patterns.length === 0) {
    return (
      <div>
        <p>共有に失敗しました. 共有の方法をもう一度見直して下さい.</p>
        <p>
          アプリの不具合だと思われる場合は, Twitterで開発者に報告できます.
          報告していただいた内容は今後のアプリの改善に役立てられます.
        </p>
        <div>
          <a
            class="twitter-mention-button"
            href={`https://twitter.com/intent/tweet?screen_name=mizdra&text=${encodeURIComponent(
              '不具合の詳細を入力して下さい.',
            )}`}
          >
            Twitterで開発者に不具合を報告
          </a>
        </div>
      </div>
    )
  }

  if (patterns.length === 1) {
    return (
      <div>
        Twitterを開いています. 自動で開かない場合は以下のボタンを押して下さい.
        <a href={patterns[0].url}>Twitterを開いて共有</a>
      </div>
    )
  }

  return (
    <div>
      <p>
        曲情報の自動判別に失敗しました. 正しい曲情報を以下から選択して下さい.
      </p>
      <ul>
        {patterns.map((pattern) => (
          <li>
            <a href={pattern.url}>{`${pattern.title} / ${pattern.artist}`}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
