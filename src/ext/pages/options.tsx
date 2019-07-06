import React from 'react'
import { render } from 'react-dom'
import { loadConfig, saveConfig } from '../js/repository'
import {
  ConfigForm,
  AvailableVariables,
} from '../../common/organisms/ConfigForm'
import { Config } from '../../common/js/config'
import './options.css'

export const LOADING_CONFIG = {
  gpmTemplate: 'Loading...',
  ytmTemplate: 'Loading...',
  hashtags: 'Loading...',
}

const AVAILABLE_VARIABLES: AvailableVariables = {
  gpm: ['title', 'artist', 'album', 'playCount'],
  ytm: ['title', 'artist', 'album'],
}

function useConfig() {
  const [config, setConfig] = React.useState<Config | null>(null)
  React.useEffect(() => {
    loadConfig().then(setConfig)
  }, [])

  return config
}

function Options() {
  const config = useConfig()

  return (
    <ConfigForm
      availableVariables={AVAILABLE_VARIABLES}
      disabled={config === null}
      defaultConfig={config ? config : LOADING_CONFIG}
      onSave={saveConfig}
    />
  )
}

render(<Options />, document.body)
