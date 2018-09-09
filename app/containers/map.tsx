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

  handleViewportChange(newCenter, newZoom, newBounds) {
    const sw = newBounds.getSouthWest()
    const ne = newBounds.getNorthEast()
    this.props.stores.map.mapMoved(newCenter, newZoom, [
      [sw.lat, sw.lng],
      [ne.lat, ne.lng]
    ])
  }

  render() {
    const mapStore = this.props.stores.map

    console.log(
      'spatial',
      this.props.stores.app.features.filter(f => f.selection.spatial)
        .length
    )
    return (
      <div className="container map-container">
        <MapComponent
          handleViewportChange={this.handleViewportChange.bind(this)}
          features={this.props.stores.app.features}
          extent={mapStore.extent}
          zoom={mapStore.zoom}
          center={mapStore.center}
        />
      </div>
    )
  }
}
