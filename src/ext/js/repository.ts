import {
  DEFAULT_TEMPLATE,
  DEFAULT_HASHTAGS,
  Config,
} from '../../common/js/config'

export type NormalizedConfig = {
  template: string
  ytmTemplate: string
  hashtags: string
}

export function loadConfig(): Promise<Config> {
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

export function saveConfig(config: Config) {
  // `gpmTemplate` は歴史的経緯により `template` という名前で保存されている
  const normalizedConfig: NormalizedConfig = {
    template: config.gpmTemplate,
    ytmTemplate: config.ytmTemplate,
    hashtags: config.hashtags,
  }
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set(normalizedConfig, () => resolve())
  })
}
