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

  records() {
    return window['stores'].app.data
  }

  render() {
    const mapStore = this.props.stores.map
    const records = this.records()
    return (
      <MapComponent
        className="map-container"
        store={this.props.stores.map}
        handleViewportChange={this.handleViewportChange.bind(this)}
        center={mapStore.center}
        zoom={mapStore.zoom}
        records={records}
      />
    )
  }
}

export default observer(MapContainer)
