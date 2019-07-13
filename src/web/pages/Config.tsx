import React from 'react'
import { loadConfig, saveConfig } from '../js/repository'
import {
  ConfigForm,
  AvailableVariables,
} from '../../common/organisms/ConfigForm'
import { Container } from '../templates/Container'

const AVAILABLE_VARIABLES: AvailableVariables = {
  gpm: ['title', 'artist'],
  ytm: ['title'],
}

export function Config() {
  return (
    <Container>
      <ConfigForm
        availableVariables={AVAILABLE_VARIABLES}
        defaultConfig={loadConfig()}
        onSave={saveConfig}
      />
    </Container>
  )
}
