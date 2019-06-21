import { h } from 'preact'
import { Top } from './pages/Top'
import { Share } from './pages/Share'

export function App() {
  const path = location.pathname
  const Content = path === '/' ? Top : Share
  return (
    <div>
      <Content />
    </div>
  )
}
