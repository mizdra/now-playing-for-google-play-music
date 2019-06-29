import { h } from 'preact'

export type Props = {
  children: any
}

export function Container(props: Props) {
  return (
    <div class="container" style={{ maxWidth: '80rem' }}>
      {props.children}
    </div>
  )
}
