import { h, render } from 'preact'
import { getConfig, setConfig } from './config'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'
import { DEFAULT_TEMPLATE, DEFAULT_HASHTAGS } from '../../common/js/util'

function Options() {
  const defaultConfig = {
    gpmTemplate: DEFAULT_TEMPLATE,
    ytmTemplate: DEFAULT_TEMPLATE,
    hashtags: DEFAULT_HASHTAGS,
  }
  return <ConfigForm defaultConfig={defaultConfig} onSave={setConfig} />
}

render(<Options />, document.body)
