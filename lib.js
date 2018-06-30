const DEFAULT_TEMPLATE = '${title} / ${artist}'
const DEFAULT_HASHTAGS = 'NowPlaying'

function renderText(template, title, artist, album) {
  return template
    .replace(/\${title}/g, title)
    .replace(/\${artist}/g, artist)
    .replace(/\${album}/g, album)
}

function renderURL(text, hashtags) {
  const encodedText = encodeURIComponent(text)
  const encodedHashtags = encodeURIComponent(hashtags)
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}`
}

function getConfig() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      {
        template: DEFAULT_TEMPLATE,
        hashtags: DEFAULT_HASHTAGS,
      },
      (response) => {
        resolve(response)
      },
    )
  })
}

function setConfig(config) {
  return new Promise((resolve) => {
    chrome.storage.sync.set(config, () => resolve())
  })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
