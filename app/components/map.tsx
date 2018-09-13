import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import { timeColor } from './../helpers/feature'
import L from 'leaflet'
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

@observer
export default class MapComponent extends React.Component<Props> {
  props
  mapEl
  markerClusterGroup
  refs
  constructor(props: any) {
    super(props)
  }

  componentDidMount() {
    this.mapEl = this.refs['map'].leafletElement
    this.props.handleViewportChange(
      this.props.center,
      this.props.zoom,
      this.mapEl.getBounds()
    )
  }

  handleMapMoved(e) {
    if (this.mapEl) {
      this.props.handleViewportChange(
        e.center,
        e.zoom,
        this.mapEl.getBounds()
      )
    }
  }

  clusterMakerIcon(cluster) {
    const markers = cluster.getAllChildMarkers()

    const timeSelections = markers.map(
      marker => marker.options.data.selection.temporal
    )

    return L.divIcon({
      html:
        '<div class="marker-icon diagonal-stripe-2" style="background-color: ' +
        timeColor(Base.average(timeSelections)) +
        '" >' +
        markers.length +
        '</div>',
      className: 'map-marker map-marker-cluster',
      iconSize: L.point(30, 30)
    })
  }

  componentDidUpdate() {
    if (
      this.markerClusterGroup &&
      this.markerClusterGroup.refreshClusters
    ) {
      this.markerClusterGroup.refreshClusters()
    }
  }

  render() {
    console.log('--map component')
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
            iconCreateFunction={this.clusterMakerIcon}
            animate={false}
            singleMarkerMode={true}
            spiderLegPolylineOptions={{ weight: 0 }}
            clockHelpingCircleOptions={{ weight: 0 }}
            ref={markerClusterGroup => {
              if (markerClusterGroup) {
                this.markerClusterGroup =
                  markerClusterGroup.leafletElement
              }
            }}
          >
            {this.props.points}
          </MarkerClusterGroup>
        </Pane>
      </Map>
    )
  }
}
