import { Music } from '../../common/js/util'

const GPM_TITLE_TAIL = 'をチェック'
const YTM_TITLE_TAIL = ' を YouTube で見る'

export function isGPMTitle(titleParam: string) {
  return titleParam.endsWith(GPM_TITLE_TAIL)
}

export function isYTMTitle(titleParam: string) {
  return titleParam.endsWith(YTM_TITLE_TAIL)
}

// Web Share Target API の title パラメータをパースし, 曲情報に変換する.
// 曲情報に複数通りの可能性があるならその全てからなるリストを, 1つもない場合は空のリストを返す.
// Google Play Music では '小倉唯のHoney Come!!をチェック' のような形式になっている
export function parseGPMTitle(titleParam: string) {
  const titleHead = titleParam.slice(0, -GPM_TITLE_TAIL.length)

  // 'の' を基準にアーティスト名と曲名を分ける.
  // 'の' が複数ある場合はその全通りを返す.
  function splitTailedTitle(fromIndex: number): Music[] {
    const index = titleHead.indexOf('の', fromIndex)
    if (index === -1) return []
    return [
      {
        artist: titleHead.slice(0, index),
        title: titleHead.slice(index + 1),
      },
      ...splitTailedTitle(index + 1),
    ]
  }

  return splitTailedTitle(0)
}

// Web Share Target API の title パラメータをパースし, 曲情報に変換する.
// 曲情報に複数通りの可能性があるならその全てからなるリストを, 1つもない場合は空のリストを返す.
// YouTube Music では '"silky heart" を YouTube で見る' のような形式になっている
export function parseYTMTitle(titleParam: string): Music[] {
  const titleHead = titleParam.slice(0, -YTM_TITLE_TAIL.length)
  // 両端のダブルクオテーションをカット
  return [{ title: titleHead.slice(1).slice(0, -1) }]
}
