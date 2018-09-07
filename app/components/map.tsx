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
import 'leaflet.markercluster'

import 'leaflet.markercluster.placementstrategies'
import MarkerClusterGroup from 'react-leaflet-markercluster'

type Props = {
  store: Object
  center: Array<Number>
  zoom: Number
  features: Array<Object>
  handleViewportChange: Function
}

class MapComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  points() {
    return this.props.features.map((feature, ri) => {
      return <Marker key={ri} position={feature.geo} />
    })
  }

  render() {
    const store = this.props.store
    return (
      <Map
        autoPanSpeed={50}
        onViewportChanged={this.props.handleViewportChange}
        useFlyTo={true}
        ref="map"
        className="map-component"
        attributionControl={false}
        bounds={store.mapExtent}
        zoom={this.props.zoom}
        center={this.props.center}
        maxZoom={20}
      >
        <ScaleControl position="topleft" imperial={false} />
        <AttributionControl position="bottomleft" />
        <TileLayer
          url="http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          attribution="&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
        />
        <Pane>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            removeOutsideVisibleBounds={true}
            elementsPlacementStrategy="clock-concentric"
            animate={false}
            singleMarkerMode={true}
            spiderLegPolylineOptions={{ weight: 0 }}
            clockHelpingCircleOptions={{ weight: 0 }}
          >
            {this.points()}
          </MarkerClusterGroup>
        </Pane>
      </Map>
    )
  }
}

export default observer(MapComponent)