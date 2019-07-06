import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
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

function createVariableList(variables: Variable[]): h.JSX.Element[] {
  if (variables.length === 0) return []
  const $li = (
    <li>
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
  const [actionMessage, setActionMessage] = useState('')
  const [newConfig, setNewConfig] = useState({ ...props.defaultConfig })

  useEffect(() => {
    setNewConfig(props.defaultConfig)
  }, [props.defaultConfig])

  function handleChange(type: 'gpmTemplate' | 'ytmTemplate' | 'hashtags') {
    return (e: Event) => {
      setNewConfig({
        ...newConfig,
        [type]: (e.currentTarget as HTMLTextAreaElement | HTMLInputElement)
          .value,
      })
    }
  }

  function handleSubmit(e: Event) {
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
      <fieldset class="gpm">
        <legend>Google Play Music</legend>
        <h3>Template</h3>
        <textarea
          disabled={props.disabled}
          onInput={handleChange('gpmTemplate')}
        >
          {newConfig.gpmTemplate}
        </textarea>

        <h4>Available variables</h4>
        <ul>{createVariableList(props.availableVariables.gpm)}</ul>
      </fieldset>,
    )
  }
  if (props.availableVariables.ytm) {
    $fieldsetList.push(
      <fieldset class="ytm">
        <legend>Youtube Music</legend>
        <h3>Template</h3>
        <textarea
          disabled={props.disabled}
          onInput={handleChange('ytmTemplate')}
        >
          {newConfig.ytmTemplate}
        </textarea>

        <h4>Available variables</h4>
        <ul>{createVariableList(props.availableVariables.ytm)}</ul>
      </fieldset>,
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 class="page-title">Config</h2>

      {$fieldsetList}

      <h3>Hash tags</h3>
      <input
        type="text"
        disabled={props.disabled}
        onInput={handleChange('hashtags')}
        value={newConfig.hashtags}
      />

      <div>
        <input disabled={props.disabled} type="submit" value="Save" />
        <span className="action-message">{actionMessage}</span>
      </div>
    </form>
  )
}
