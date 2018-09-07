import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import {
  Map,
  LayerGroup,
  TileLayer,
  WMSTileLayer,
  GeoJSON,
  Pane,
  CircleMarker,
  ScaleControl,
  AttributionControl,
  Marker,
  Popup,
  Tooltip
} from 'react-leaflet'

import MarkerClusterGroup from 'react-leaflet-markercluster'
// import 'leaflet.markercluster.placementstrategies'

type Props = {
  store: Object
}

class MapComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  mapStyle() {
    return {
      width: '100%',
      bottom: '50%',
      top: '0',
      position: 'absolute'
    }
  }

  render() {
    const store = this.props.store
    return (
      <Map
        autoPanSpeed={50}
        onViewportChanged={this.props.handleViewportChange}
        useFlyTo={true}
        ref="map"
        style={this.mapStyle()}
        attributionControl={false}
        bounds={store.mapExtent}
        zoom={this.props.zoom}
        center={this.props.center}
      >
        <ScaleControl position="topleft" imperial={false} />
        <AttributionControl position="bottomleft" />
        <TileLayer
          url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        />
      </Map>
    )
  }
}

export default observer(MapComponent)
