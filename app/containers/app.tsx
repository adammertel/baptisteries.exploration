import React from 'react'
import { observer } from 'mobx-react'
import MapContainer from './map'
import PanelContainer from './panel'

type Props = {
  stores: Array<Object>
}

class AppContainer extends React.Component<any, any> {
  props
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className="container-wrapper app-container">
        <MapContainer stores={this.props.stores} />
        <PanelContainer stores={this.props.stores} />
      </div>
    )
  }
}

export default observer(AppContainer)
