import React from 'react'
import { observer } from 'mobx-react'
import MapContainer from './map'
import PanelContainer from './panel'

type Props = {}

class AppContainer extends React.Component<any, any> {
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className="app-container">
        <MapContainer />
        <PanelContainer />
      </div>
    )
  }
}

export default observer(AppContainer)
