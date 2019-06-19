import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS } from '../../common/js/util'

export function getConfig() {
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

export function setConfig(config) {
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
