import {
  DEFAULT_TEMPLATE,
  DEFAULT_HASHTAGS,
  Config,
} from '../../common/js/config'

const CONFIG_KEY = 'config'

export function loadConfig(): Config {
  const json = localStorage.getItem(CONFIG_KEY) || '{}'
  return {
    gpmTemplate: DEFAULT_TEMPLATE,
    ytmTemplate: DEFAULT_TEMPLATE,
    hashtags: DEFAULT_HASHTAGS,
    ...JSON.parse(json),
  }
}

export function saveConfig(newConfig: Config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig))
}
