export const DEFAULT_TEMPLATE = '${title} / ${artist}'
export const DEFAULT_HASHTAGS = 'NowPlaying'

export function renderText(
  template: string,
  title?: string | null,
  artist?: string | null,
  album?: string | null,
  playCount?: string | null,
) {
  return template
    .replace(/\${title}/g, title || '')
    .replace(/\${artist}/g, artist || '')
    .replace(/\${album}/g, album || '')
    .replace(/\${playCount}/g, playCount || '')
}

export function renderURL(text: string, hashtags: string) {
  const encodedText = encodeURIComponent(text)
  const encodedHashtags = encodeURIComponent(hashtags)
  return `https://twitter.com/intent/tweet?text=${encodedText}&hashtags=${encodedHashtags}`
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
