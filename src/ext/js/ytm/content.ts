import { getConfig } from '../config'
import { renderText, renderURL, sleep } from '../../../common/js/util'

// 再生中の曲を SNS で共有する
async function share() {
  const title = document.querySelector('ytmusic-player-bar .title')!.textContent
  const [artist = '', album = ''] = Array.from(
    document.querySelectorAll('ytmusic-player-bar .subtitle a'),
  ).map((a) => a.textContent)
  const { ytmTemplate, hashtags } = await getConfig()

  const text = renderText(ytmTemplate, title, artist, album)
  const url = renderURL(text, hashtags)

  window.open(url)
}

// DOM の構築完了を待ってから共有ボタンをプレイヤー (画面下部の操作バー) に挿入
function insertShareButton() {
  const rightControlsButtons = document.querySelector(
    'ytmusic-player-bar .right-controls-buttons',
  )! // 右下のツールボックス

  // 共有ボタンを作成
  const shareButton = document.createElement('paper-icon-button')
  shareButton.setAttribute('icon', 'reply')
  shareButton.setAttribute(
    'id',
    'now-playing-for-google-play-music__share-button',
  )
  shareButton.setAttribute('title', 'Share music to SNS')
  shareButton.addEventListener('click', () => share())

  // 音量調整ボタンとキューボタンの間に挿入
  rightControlsButtons.appendChild(shareButton)
}

// プレイヤーが読み込まれるまで待機する
async function waitPlayerLoaded() {
  // #right-controls-buttons が読み込まれたら, プレイヤーが読み込まれたものとして扱う
  while (
    document.querySelector('ytmusic-player-bar .right-controls-buttons') ===
    null
  ) {
    await sleep(1000)
  }
}

// DOMContentLoaded の後もDOMが動的に挿入されていくので,
// プレイヤー が読み込まれるまでポーリングして, 挿入された
// タイミングで insertShareButton を呼び出す.
waitPlayerLoaded().then(insertShareButton)
