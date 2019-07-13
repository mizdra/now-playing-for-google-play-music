export type MusicInfo = { artist: string; title: string }

function parseYTMTitle(titleParam: string): MusicInfo[] {
  const titleHead = titleParam.slice(0, -' を YouTube で見る'.length)
  // 両端のダブルクオテーションをカット
  return [{ title: titleHead.slice(0, 1).slice(0, -1), artist: '' }]
}

function parseGPMTitle(titleParam: string) {
  const titleHead = titleParam.slice(0, -5)

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
  if (titleParam.endsWith(' を YouTube で見る'))
    return parseYTMTitle(titleParam)
  // Google Play Music では '小倉唯のHoney Come!!をチェック' のような形式になっている
  if (titleParam.endsWith('をチェック')) return parseGPMTitle(titleParam)
  return []
}
