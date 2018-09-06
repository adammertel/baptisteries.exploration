import React from 'react'
import { observer, action } from 'mobx-react'

type Props = {}

export default class PanelContainer extends React.Component<Props> {
  constructor (props: any) {
    super(props)
  }

  render () {
    return (
      <div className='panel-container'>
        panel
      </div>
    )
  }
}
