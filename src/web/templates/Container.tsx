import { h, ComponentChildren } from 'preact'

export type Props = {
  children: ComponentChildren
}

export function Container(props: Props) {
  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      {props.children}
    </div>
  )
}
