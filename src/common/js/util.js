export const DEFAULT_TEMPLATE = '${title} / ${artist}'
export const DEFAULT_HASHTAGS = 'NowPlaying'

export function renderText(template, title, artist, album, playCount) {
  return template
    .replace(/\${title}/g, title)
    .replace(/\${artist}/g, artist)
    .replace(/\${album}/g, album)
    .replace(/\${playCount}/g, playCount)
}

export function renderURL(text, hashtags) {
  const encodedText = encodeURIComponent(text)
  const encodedHashtags = encodeURIComponent(hashtags)
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}`
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
