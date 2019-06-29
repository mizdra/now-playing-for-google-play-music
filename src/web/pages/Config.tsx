import { h } from 'preact'
import { Config } from '../../ext/js/config'
import { getConfig, setConfig } from '../js/config'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'

export function Config() {
  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      <ConfigForm defaultConfig={getConfig()} onSave={setConfig} />
    </div>
  )
}
