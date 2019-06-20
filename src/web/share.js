import './initialize'
import {
  DEFAULT_TEMPLATE,
  DEFAULT_HASHTAGS,
  renderText,
  renderURL,
} from '../common/js/util'

function parseVariables(searchStr) {
  const params = new URLSearchParams(searchStr)
  const titleParam = params.get('title')

  // `titleParam` は "小倉唯のHoney Come!!をチェック" のような形式になっている
  const [artist = '', title = ''] = titleParam
    .slice(0, -5) // 末尾の "をチェック" を切り落とす
    .split('の')
  console.log(artist, title) // for Debug
  return { artist, title }
}

const { artist, title } = parseVariables(location.search)
const text = renderText(DEFAULT_TEMPLATE, title, artist)
const url = renderURL(text, DEFAULT_HASHTAGS)

window.open(url)
