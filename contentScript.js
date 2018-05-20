function share() {
  const currentlyPlayingTitle = document.getElementById('currently-playing-title')
  const playerArtist = document.getElementById('player-artist')

  const title = currentlyPlayingTitle.textContent
  const artist = playerArtist.textContent

  const tweet = `${title} / ${artist}`
  const hashtag = 'NowPlaying'
  const url = `https://twitter.com/intent/tweet?text=${encodeURI(tweet)}&hashtags=${encodeURI(hashtag)}`
  window.open(url)
}

document.addEventListener('keyup', (e) => {
  if (e.key === 't') { // `t` が入力された場合
    share()
    e.preventDefault() // イベントをキャンセル
  }
})
