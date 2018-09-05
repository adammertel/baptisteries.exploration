import React from 'react'
import { observer, action } from 'mobx-react'
import MapContainer from './map'
import PanelContainer from './panel'

export default class AppContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='app-container'>
        <MapContainer />
        <PanelContainer />
      </div>
    )
  }
}
