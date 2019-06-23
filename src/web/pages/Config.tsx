import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Config } from '../../ext/js/config'
import { getConfig, setConfig } from '../js/config'

function useConfig() {
  const config = getConfig()
  return [config, setConfig] as const
}

export function Config() {
  const [actionMessage, setActionMessage] = useState('')
  const [config, setConfig] = useConfig()
  const [newConfig, setNewConfig] = useState({ ...config })
  console.log(newConfig)

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

  function handleSave() {
    setConfig(newConfig)
    setActionMessage('Saved!')
    setTimeout(() => {
      setActionMessage('')
    }, 3000)
  }

  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      <h2 class="page-title">Config</h2>
      <fieldset class="gpm">
        <legend>Google Play Music</legend>
        <h3>Template</h3>
        <textarea onInput={handleGpmTemplateChange}>
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
        <textarea onInput={handleYtmTemplateChange}>
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
        onInput={handleHashtagsChange}
        value={newConfig.hashtags}
      />

      <div>
        <button onClick={handleSave}>Save</button>
        <span className="action-message">{actionMessage}</span>
      </div>
    </div>
  )
}
