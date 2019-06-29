import { h, render } from 'preact'
import { loadConfig, saveConfig } from './repository'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'
import { useState, useEffect } from 'preact/hooks'
import { Config } from '../../common/js/config'

export const LOADING_CONFIG = {
  gpmTemplate: 'Loading...',
  ytmTemplate: 'Loading...',
  hashtags: 'Loading...',
}

function useConfig() {
  const [config, setConfig] = useState<Config | null>(null)
  useEffect(() => {
    loadConfig().then(setConfig)
  }, [])

  return config
}

function Options() {
  const config = useConfig()

  return (
    <ConfigForm
      disabled={config === null}
      defaultConfig={config ? config : LOADING_CONFIG}
      onSave={saveConfig}
    />
  )
}

render(<Options />, document.body)
