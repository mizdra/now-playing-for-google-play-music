const DEFAULT_TEMPLATE = '${title} / ${artist}'
const DEFAULT_HASHTAGS = 'NowPlaying'

// 再生中の曲を SNS で共有する
async function share() {
  const title = document.querySelector('#currently-playing-title').textContent
  const artist = document.querySelector('#player-artist').textContent
  const album = document.querySelector('.player-album').textContent
  const { template, hashtags } = await getConfig()

  const text = renderText(template, title, artist, album)
  const url = renderURL(text, hashtags)

  window.open(url)
}

// DOM の構築完了を待ってから共有ボタンをプレイヤー (画面下部の操作バー) に挿入
function insertShareButton() {
  const wrapper = document.getElementById('material-player-right-wrapper') // 右下のツールボックス
  const queue = document.getElementById('queue') // 次に再生される曲を表示するボタン

  // 共有ボタンを作成
  const shareButton = document.createElement('paper-icon-button')
  shareButton.setAttribute('icon', 'social:share')
  shareButton.setAttribute('id', 'now-playing-for-google-play-music__share-button')
  shareButton.setAttribute('title', 'Share music to SNS')
  shareButton.addEventListener('click', () => share())

  // 音量調整ボタンとキューボタンの間に挿入
  wrapper.insertBefore(shareButton, queue)
}

function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({
      template: DEFAULT_TEMPLATE,
      hashtags: DEFAULT_HASHTAGS,
    }, (response) => {
      resolve(response)
    })
  })
}

function renderText(template, title, artist, album) {
  return template
    .replace(/\${title}/g, title)
    .replace(/\${artist}/g, artist)
    .replace(/\${album}/g, album)
}

function renderURL(text, hashtags) {
  const encodedText = encodeURI(text)
  const encodedHashtags = encodeURI(hashtags)
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}`
}

// Firefox と Chrome で document_idle の挙動が異なるので,
// window.onload で共有ボタンの挿入タイミングを制御
window.addEventListener("load", () => insertShareButton())
