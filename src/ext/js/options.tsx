import { h, render } from 'preact'
import { getConfig, setConfig, Config } from './config'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'
import { useState, useEffect } from 'preact/hooks'

export const LOADING_CONFIG = {
  gpmTemplate: 'Loading...',
  ytmTemplate: 'Loading...',
  hashtags: 'Loading...',
}

function useConfig() {
  const [config, setConfig] = useState<Config | null>(null)
  useEffect(() => {
    getConfig().then(setConfig)
  }, [])

  return config
}

function Options() {
  const config = useConfig()

  return (
    <ConfigForm
      disabled={config === null}
      defaultConfig={config ? config : LOADING_CONFIG}
      onSave={setConfig}
    />
  )
}

render(<Options />, document.body)
