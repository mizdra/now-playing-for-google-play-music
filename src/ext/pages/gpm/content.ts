import { loadConfig } from '../../js/repository'
import { renderText, renderURL, sleep } from '../../../common/js/util'
import './content.css'

// 再生中の曲を SNS で共有する
async function share() {
  const title = document.querySelector('#currently-playing-title')!.textContent
  const artist = document.querySelector('#player-artist')!.textContent
  const album = document.querySelector('.player-album')!.textContent
  const playCount =
    document.querySelector(
      '#queue-overlay .currently-playing [data-col="play-count"]',
    )!.textContent || '0'
  const { gpmTemplate, hashtags } = await loadConfig()

  const text = renderText(gpmTemplate, { title, artist, album, playCount })
  const url = renderURL(text, hashtags)

  window.open(url)
}

// DOM の構築完了を待ってから共有ボタンをプレイヤー (画面下部の操作バー) に挿入
function insertShareButton() {
  const $wrapper = document.getElementById('material-player-right-wrapper')! // 右下のツールボックス
  const $queue = $wrapper.querySelector("#queue")! // 次に再生される曲を表示するボタン

  // 共有ボタンを作成
  const $shareButton = document.createElement('paper-icon-button')
  $shareButton.setAttribute('icon', 'social:share')
  $shareButton.setAttribute(
    'id',
    'now-playing-for-google-play-music__share-button',
  )
  $shareButton.setAttribute('title', 'Share music to SNS')
  $shareButton.addEventListener('click', () => share())

  // 音量調整ボタンとキューボタンの間に挿入
  $wrapper.insertBefore($shareButton, $queue)
}

// 初期状態では再生回数が埋め込まれている DOM がまだレンダリングされてないので,
// 一瞬だけ #queue-overlay を表示して強制的にレンダリングする
function prerenderPlayCount() {
  const $wrapper = document.getElementById('material-player-right-wrapper')! // 右下のツールボックス
  const $queue = $wrapper.querySelector('#queue')! // キューを表示するボタン
  const $queueOverlay = document.querySelector('#queue-overlay')! // キュー
  const clickEvent = document.createEvent('MouseEvents')
  clickEvent.initEvent('click', true, false)

  $queueOverlay.addEventListener(
    'iron-overlay-closed',
    () => {
      $queue.classList.remove('disable')
      $queueOverlay.classList.remove('hidden')
    },
    { once: true },
  )

  // #queue-overlay を不可視にしてから表示
  $queue.classList.add('disable')
  $queueOverlay.classList.add('hidden')
  $queue.dispatchEvent(clickEvent)
  requestAnimationFrame(() => {
    $queue.dispatchEvent(clickEvent)
  })
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
waitPlayerInserted().then(() => {
  insertShareButton()
  prerenderPlayCount()
})
