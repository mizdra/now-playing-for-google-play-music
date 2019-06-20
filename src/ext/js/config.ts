import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS } from '../../common/js/util'

export type Config = {
  gpmTemplate: string
  ytmTemplate: string
  hashtags: string
}

export type NormalizedConfig = {
  template: string
  ytmTemplate: string
  hashtags: string
}

export function getConfig(): Promise<Config> {
  return new Promise<NormalizedConfig>((resolve) => {
    chrome.storage.sync.get(
      {
        // `gpmTemplate` は歴史的経緯により `template` という名前で保存されている
        template: DEFAULT_TEMPLATE,
        ytmTemplate: DEFAULT_TEMPLATE,
        hashtags: DEFAULT_HASHTAGS,
      },
      (response) => {
        resolve(response as NormalizedConfig)
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

export function setConfig(config: Config) {
  // `gpmTemplate` は歴史的経緯により `template` という名前で保存されている
  const normalizedConfig: NormalizedConfig = {
    template: config.gpmTemplate,
    ytmTemplate: config.ytmTemplate,
    hashtags: config.hashtags,
  }
  return new Promise((resolve) => {
    chrome.storage.sync.set(normalizedConfig, () => resolve())
  })
}
