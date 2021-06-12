import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS, Config } from '../../common/js/config';

export type NormalizedConfig = {
  ytmTemplate: string;
  hashtags: string;
};

export function loadConfig(): Promise<Config> {
  return new Promise<NormalizedConfig>((resolve) => {
    chrome.storage.sync.get(
      {
        ytmTemplate: DEFAULT_TEMPLATE,
        hashtags: DEFAULT_HASHTAGS,
      },
      (response) => {
        resolve(response as NormalizedConfig);
      },
    );
  }).then((config) => {
    return {
      ytmTemplate: config.ytmTemplate,
      hashtags: config.hashtags,
    };
  });
}

export function saveConfig(config: Config) {
  const normalizedConfig: NormalizedConfig = {
    ytmTemplate: config.ytmTemplate,
    hashtags: config.hashtags,
  };
  return new Promise<void>((resolve) => {
    chrome.storage.sync.set(normalizedConfig, () => resolve());
  });
}
