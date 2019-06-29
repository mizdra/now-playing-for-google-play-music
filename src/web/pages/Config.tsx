import { h } from 'preact'
import { loadConfig, saveConfig } from '../js/repository'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'

export function Config() {
  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      <ConfigForm defaultConfig={loadConfig()} onSave={saveConfig} />
    </div>
  )
}
