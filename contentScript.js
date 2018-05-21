// 再生中の曲を SNS で共有する
function share() {
  const currentlyPlayingTitle = document.getElementById('currently-playing-title')
  const playerArtist = document.getElementById('player-artist')

  const title = currentlyPlayingTitle.textContent
  const artist = playerArtist.textContent

  const tweet = encodeURI(`${title} / ${artist}`)
  const hashtag = 'NowPlaying'
  const url = `https://twitter.com/intent/tweet?text=${tweet}&hashtags=${hashtag}`
  window.open(url)
}

// DOM の構築完了を待ってから共有ボタンをプレイヤー (画面下部の操作バー) に挿入
function insertShareButton() {
  const materialPlayerRightWrapper = document.getElementById('material-player-right-wrapper') // 右下のツールボックス
  const queue = document.getElementById('queue') // 次に再生される曲を表示するボタン

  // 共有ボタンを作成
  const shareButton = document.createElement('paper-icon-button')
  shareButton.setAttribute('icon', 'social:share')
  shareButton.setAttribute('id', 'now-playing-for-google-play-music__share-button')
  shareButton.setAttribute('title', 'Share music to SNS')
  shareButton.addEventListener('click', () => share())

  // 音量調整ボタンとキューボタンの間に挿入
  materialPlayerRightWrapper.insertBefore(shareButton, queue)
}

insertShareButton()
