import React from 'react'
import { Config } from '../js/config'
import './ConfigForm.css'

export type Variable = 'title' | 'artist' | 'album' | 'playCount'

export type AvailableVariables = {
  gpm?: Variable[]
  ytm?: Variable[]
}

const DESCRIPTIONS: { [key in Variable]: string } = {
  title: 'The title of music',
  artist: 'The artist name of music',
  album: 'The album name of music',
  playCount: 'The play count of music',
}

function createVariableList(variables: Variable[]): React.ReactElement[] {
  if (variables.length === 0) return []
  const $li = (
    <li key={variables[0]}>
      <code>{'${' + variables[0] + '}'}</code>: {DESCRIPTIONS[variables[0]]}
    </li>
  )
  return [$li, ...createVariableList(variables.slice(1))]
}

export type Props = {
  availableVariables: AvailableVariables
  disabled?: boolean
  defaultConfig: Config
  onSave: (newConfig: Config) => void
}

export function ConfigForm(props: Props) {
  const [actionMessage, setActionMessage] = React.useState('')
  const [newConfig, setNewConfig] = React.useState({ ...props.defaultConfig })

  React.useEffect(() => {
    setNewConfig(props.defaultConfig)
  }, [props.defaultConfig])

  function handleChange(type: 'gpmTemplate' | 'ytmTemplate' | 'hashtags') {
    return (e: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNewConfig({
        ...newConfig,
        [type]: e.currentTarget.value,
      })
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    props.onSave(newConfig)
    setActionMessage('Saved!')
    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  const $fieldsetList = []
  if (props.availableVariables.gpm) {
    $fieldsetList.push(
      <fieldset key="gpm" className="gpm">
        <legend>Google Play Music</legend>
        <h3>Template</h3>
        <textarea
          value={newConfig.gpmTemplate}
          disabled={props.disabled}
          onChange={handleChange('gpmTemplate')}
        />

        <h4>Available variables</h4>
        <ul>{createVariableList(props.availableVariables.gpm)}</ul>
      </fieldset>,
    )
  }
  if (props.availableVariables.ytm) {
    $fieldsetList.push(
      <fieldset key="ytm" className="ytm">
        <legend>Youtube Music</legend>
        <h3>Template</h3>
        <textarea
          value={newConfig.ytmTemplate}
          disabled={props.disabled}
          onChange={handleChange('ytmTemplate')}
        />

        <h4>Available variables</h4>
        <ul>{createVariableList(props.availableVariables.ytm)}</ul>
      </fieldset>,
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="page-title">Config</h2>

      {$fieldsetList}

      <h3>Hash tags</h3>
      <input
        type="text"
        value={newConfig.hashtags}
        disabled={props.disabled}
        onChange={handleChange('hashtags')}
      />

      <div>
        <input disabled={props.disabled} type="submit" value="Save" />
        <span className="action-message">{actionMessage}</span>
      </div>
    </form>
  )
}
