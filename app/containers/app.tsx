import React from 'react'
import { observer } from 'mobx-react'
import MapContainer from './map'
import PanelContainer from './panel'

type Props = {
  stores: Array<Object>
}

@observer
export default class AppContainer extends React.Component<any, any> {
  props
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className="container-wrapper app-container">
        <PanelContainer stores={this.props.stores} />
        <MapContainer stores={this.props.stores} />
      </div>
    )
  }
}
