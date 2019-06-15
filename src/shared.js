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
        // `gpmTemplate` は歴史的経緯により `template` という名前で保存されている
        template: DEFAULT_TEMPLATE,
        ytmTemplate: DEFAULT_TEMPLATE,
        hashtags: DEFAULT_HASHTAGS,
      },
      (response) => {
        resolve(response)
      },
    )
  }).then((config) => {
    return {
      gpmTemplate: config.template,
      ytmTemplate: config.ytmTemplate,
      hashtags: config.hashtags,
    }
  })
}

function setConfig(config) {
  // `gpmTemplate` は歴史的経緯により `template` という名前で保存されている
  const normalizedConfig = {
    template: config.gpmTemplate,
    ytmTemplate: config.ytmTemplate,
    hashtags: config.hashtags,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(normalizedConfig, () => resolve())
  })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
