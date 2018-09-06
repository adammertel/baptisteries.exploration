// @flow

import React from 'react'
import { observer, action } from 'mobx-react'
import MapContainer from './map'
import PanelContainer from './panel'

type Props = {}

export default class AppContainer extends React.Component<Props> {
  constructor (props: any) {
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
