export const DEFAULT_TEMPLATE = '${title} / ${artist}'
export const DEFAULT_TEMPLATE_FOR_YTM_ANDROID = '${title}'
export const DEFAULT_HASHTAGS = 'NowPlaying'
export type Config = {
  gpmTemplate: string
  ytmTemplate: string
  hashtags: string
}
