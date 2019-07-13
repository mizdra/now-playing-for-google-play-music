import React from 'react'
import { Top } from './pages/Top'
import { Config } from './pages/Config'
import { Share } from './pages/Share'

export function App() {
  const path = location.pathname
  if (path === '/') return <Top />
  if (path === '/config') return <Config />
  if (path === '/share') {
    const params = new URLSearchParams(location.search)
    return (
      <Share
        params={{
          title: params.get('title'),
          text: params.get('text'),
          url: params.get('url'),
        }}
      />
    )
  }
  throw new Error('404 Not Found')
}
