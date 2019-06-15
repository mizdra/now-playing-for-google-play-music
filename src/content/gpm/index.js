// 再生中の曲を SNS で共有する
async function share() {
  const title = document.querySelector('#currently-playing-title').textContent
  const artist = document.querySelector('#player-artist').textContent
  const album = document.querySelector('.player-album').textContent
  const { gpmTemplate, hashtags } = await getConfig()

  const text = renderText(gpmTemplate, title, artist, album)
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
  shareButton.setAttribute(
    'id',
    'now-playing-for-google-play-music__share-button',
  )
  shareButton.setAttribute('title', 'Share music to SNS')
  shareButton.addEventListener('click', () => share())

  // 音量調整ボタンとキューボタンの間に挿入
  wrapper.insertBefore(shareButton, queue)
}

// プレイヤーが挿入されるまで待機する
async function waitPlayerInserted() {
  // #material-player-right-wrapper がDOMに読み込まれたら, プレイヤーが挿入されたとして扱う
  while (document.getElementById('material-player-right-wrapper') === null) {
    await sleep(1000)
  }
}

// DOMContentLoaded の後もDOMが動的に挿入されていくので,
// プレイヤー が挿入されるまでポーリングして, 挿入された
// タイミングで insertShareButton を呼び出す.
waitPlayerInserted().then(insertShareButton)
