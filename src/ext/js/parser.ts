import { MusicInfo } from '../../common/js/util'

const YTM_TITLE_TAIL = ' を YouTube で見る'
const GPM_TITLE_TAIL = 'をチェック'

function parseYTMTitle(titleParam: string): MusicInfo[] {
  const titleHead = titleParam.slice(0, -YTM_TITLE_TAIL.length)
  // 両端のダブルクオテーションをカット
  return [{ title: titleHead.slice(0, 1).slice(0, -1) }]
}

function parseGPMTitle(titleParam: string) {
  const titleHead = titleParam.slice(0, -GPM_TITLE_TAIL.length)

  // 'の' を基準にアーティスト名と曲名を分ける.
  // 'の' が複数ある場合はその全通りを返す.
  function splitTailedTitle(fromIndex: number): MusicInfo[] {
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
export function parseTitle(titleParam: string | null): MusicInfo[] {
  if (titleParam === null) return []
  // YouTube Music では '"silky heart" を YouTube で見る' のような形式になっている
  if (titleParam.endsWith(YTM_TITLE_TAIL)) return parseYTMTitle(titleParam)
  // Google Play Music では '小倉唯のHoney Come!!をチェック' のような形式になっている
  if (titleParam.endsWith(GPM_TITLE_TAIL)) return parseGPMTitle(titleParam)
  return []
}
