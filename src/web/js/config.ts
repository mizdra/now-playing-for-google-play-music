import { Config } from '../../ext/js/config'
import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS } from '../../common/js/util'

const CONFIG_KEY = 'config'

export function getConfig(): Config {
  const json = localStorage.getItem(CONFIG_KEY) || '{}'
  return {
    gpmTemplate: DEFAULT_TEMPLATE,
    ytmTemplate: DEFAULT_TEMPLATE,
    hashtags: DEFAULT_HASHTAGS,
    ...JSON.parse(json),
  }
}

export function setConfig(newConfig: Config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig))
}
