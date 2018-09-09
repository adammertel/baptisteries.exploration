import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import MapComponent from './../components/map'
import map from './../components/map'

type Props = {
  stores: Array<Object>
}

@observer
export default class MapContainer extends React.Component<Props> {
  props

  constructor(props: any) {
    super(props)
  }

  handleViewportChange(e) {
    this.props.stores.map.mapMoved(e.center, e.zoom)
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('should map')
    return true
  }

  render() {
    const mapStore = this.props.stores.map

    return (
      <div className="container map-container">
        <MapComponent
          handleViewportChange={this.handleViewportChange.bind(this)}
          center={mapStore.center}
          zoom={mapStore.zoom}
          features={this.props.stores.app.features}
          extent={mapStore.mapExtent}
        />
      </div>
    )
  }
}
