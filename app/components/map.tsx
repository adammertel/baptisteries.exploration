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
  center: Array<Number>
  zoom: Number
  features: Array<Object>
  handleViewportChange: Function
}

export default class MapComponent extends React.Component<Props> {
  props
  mapEl
  refs
  constructor(props: any) {
    super(props)
  }

  points() {
    return this.props.features.map((feature, ri) => {
      return <Marker key={ri} position={feature.geo} />
    })
  }

  componentDidMount() {
    this.mapEl = this.refs['map'].leafletElement
  }

  handleMapMoved(e) {
    console.log('map moved')
    if (this.mapEl) {
      this.props.handleViewportChange(e, this.mapEl.getBounds())
    }
  }

  render() {
    return (
      <Map
        onViewportChanged={this.handleMapMoved.bind(this)}
        ref="map"
        className="map-component"
        attributionControl={false}
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
