import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import MapComponent from './../components/map'

type Props = {
  stores: Array<Object>
}

class MapContainer extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  handleViewportChange(e) {
    this.props.stores.map.mapMoved(e.center, e.zoom)
  }

  render() {
    const mapStore = this.props.stores.map
    return (
      <MapComponent
        className="map-container"
        store={this.props.stores.map}
        handleViewportChange={this.handleViewportChange.bind(this)}
        center={mapStore.center}
        zoom={mapStore.zoom}
      />
    )
  }
}

export default observer(MapContainer)
