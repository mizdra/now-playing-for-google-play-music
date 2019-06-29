import { h } from 'preact'
import { useState, useEffect } from 'preact/hooks'
import { Config } from '../config'
export type Props = {
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

  function handleGpmTemplateChange(e: any) {
    setNewConfig({
      ...newConfig,
      gpmTemplate: e.target.value,
    })
  }

  function handleYtmTemplateChange(e: any) {
    setNewConfig({
      ...newConfig,
      ytmTemplate: e.target.value,
    })
  }

  function handleHashtagsChange(e: any) {
    setNewConfig({
      ...newConfig,
      hashtags: e.target.value,
    })
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    props.onSave(newConfig)
    setActionMessage('Saved!')
    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2 class="page-title">Config</h2>
      <fieldset class="gpm">
        <legend>Google Play Music</legend>
        <h3>Template</h3>
        <textarea disabled={props.disabled} onInput={handleGpmTemplateChange}>
          {newConfig.gpmTemplate}
        </textarea>

        <h4>Available variables</h4>
        <ul>
          <li>
            <code>{'${title}'}</code>: The title of music
          </li>
          <li>
            <code>{'${artist}'}</code>: The artist name of music
          </li>
        </ul>
      </fieldset>
      <fieldset class="ytm">
        <legend>Youtube Music</legend>
        <h3>Template</h3>
        <textarea disabled={props.disabled} onInput={handleYtmTemplateChange}>
          {newConfig.ytmTemplate}
        </textarea>

        <h4>Available variables</h4>
        <ul>
          <li>
            <code>{'${title}'}</code>: The title of music
          </li>
          <li>
            <code>{'${artist}'}</code>: The artist name of music
          </li>
        </ul>
      </fieldset>

      <h3>Hash tags</h3>
      <input
        type="text"
        disabled={props.disabled}
        onInput={handleHashtagsChange}
        value={newConfig.hashtags}
      />

      <div>
        <input disabled={props.disabled} type="submit" value="Save" />
        <span className="action-message">{actionMessage}</span>
      </div>
    </form>
  )
}
