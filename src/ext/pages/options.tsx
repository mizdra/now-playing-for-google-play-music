import { h, render } from 'preact'
import { loadConfig, saveConfig } from '../js/repository'
import { ConfigForm } from '../../common/organisms/ConfigForm'
import { useState, useEffect } from 'preact/hooks'
import { Config } from '../../common/js/config'
import './options.css'

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
