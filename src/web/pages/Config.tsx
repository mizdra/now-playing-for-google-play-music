import { h } from 'preact'
import { loadConfig, saveConfig } from '../js/repository'
import { ConfigForm } from '../../common/js/organisms/ConfigForm'
import { Container } from '../templates/Container'

export function Config() {
  return (
    <Container>
      <ConfigForm defaultConfig={loadConfig()} onSave={saveConfig} />
    </Container>
  )
}
