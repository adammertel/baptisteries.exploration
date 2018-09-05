import React from 'react'
import { observer, action } from 'mobx-react'

export default class PanelContainer extends React.Component {
  constructor (props) {
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
