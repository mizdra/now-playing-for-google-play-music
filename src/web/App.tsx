import { h } from 'preact'
import { Top } from './pages/Top'
import { Config } from './pages/Config'
import { Share } from './pages/Share'

export function App() {
  const path = location.pathname
  const Content = path === '/' ? Top : path === '/config' ? Config : Share
  return (
    <div>
      <Content />
    </div>
  )
}
