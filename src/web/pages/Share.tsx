import React from 'react'
import {
  renderText,
  renderURL,
  renderBugReportURL,
  Music,
} from '../../common/js/util'
import { loadConfig } from '../js/repository'
import { Container } from '../templates/Container'
import {
  isYTMTitle,
  parseYTMTitle,
  isGPMTitle,
  parseGPMTitle,
} from '../js/parser'

type Props = {
  params: {
    title: string | null
    text: string | null
    url: string | null
  }
}

export function Share(props: Props) {
  const config = loadConfig()
  const titleParam = props.params.title

  const renderedMusicList = React.useMemo(() => {
    let template: string
    let musicList: Music[]

    // get `template` and `musicList`
    if (titleParam === null) return []
    else if (isGPMTitle(titleParam)) {
      template = config.gpmTemplate
      musicList = parseGPMTitle(titleParam)
    } else if (isYTMTitle(titleParam)) {
      template = config.ytmTemplate
      musicList = parseYTMTitle(titleParam)
    } else return []

    return musicList.map((music) => {
      const text = renderText(template, music)
      const url = renderURL(text, config.hashtags)
      return {
        ...music,
        text,
        url,
      }
    })
  }, [config.hashtags, titleParam])

  React.useEffect(() => {
    if (renderedMusicList.length === 1) location.href = renderedMusicList[0].url
  }, [renderedMusicList])

  if (renderedMusicList.length === 0) {
    return (
      <Container>
        <p>共有に失敗しました. 共有の方法をもう一度見直して下さい.</p>
        <p>
          アプリの不具合だと思われる場合は, Twitterで開発者に報告できます.
          報告していただいた内容は今後のアプリの改善に役立てられます.
        </p>
        <div>
          <a
            className="button"
            href={renderBugReportURL({
              config,
              patterns: renderedMusicList,
            })}
          >
            Twitterで開発者に不具合を報告
          </a>
        </div>
      </Container>
    )
  }

  if (renderedMusicList.length === 1) {
    return (
      <Container>
        Twitterを開いています. 自動で開かない場合は以下のボタンを押して下さい.
        <a className="button" href={renderedMusicList[0].url}>
          Twitterを開いて共有
        </a>
      </Container>
    )
  }

  return (
    <Container>
      <p>
        曲情報の自動判別に失敗しました. 正しい曲情報を以下から選択して下さい.
      </p>
      <ol className="pattern-list">
        {renderedMusicList.map((pattern, index) => (
          <li>
            <a className="pattern-link" href={pattern.url}>
              <div className="pattern-link-text">
                <div className="pattern-index">{`${index + 1}. `}</div>
                <div>{pattern.text}</div>
              </div>
            </a>
          </li>
        ))}
      </ol>
    </Container>
  )
}
