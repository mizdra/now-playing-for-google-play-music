import {
  DEFAULT_HASHTAGS,
  Config,
  DEFAULT_TEMPLATE_FOR_YTM_ANDROID,
} from '../../common/js/config'

const CONFIG_KEY = 'config'

export function loadConfig(): Config {
  const json = localStorage.getItem(CONFIG_KEY) || '{}'
  return {
    ytmTemplate: DEFAULT_TEMPLATE_FOR_YTM_ANDROID,
    hashtags: DEFAULT_HASHTAGS,
    ...JSON.parse(json),
  }
}

export function saveConfig(newConfig: Config) {
  localStorage.setItem(CONFIG_KEY, JSON.stringify(newConfig))
}
