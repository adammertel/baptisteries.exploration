import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Config from './../helpers/config'
import Colors from './../helpers/colors'
import { timeColor, markerBorderColor } from './../helpers/feature'
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

    const spatialCertainties = markers.map(
      marker => marker.options.data.props.certainty_location
    )

    const timeSelectionAvg = Base.average(timeSelections)
    const spatialCertaintiesAvg = Base.average(spatialCertainties)

    const ids = markers.map(m => m.options.data.props.id)
    //console.log('cluster', ids, timeSelections)

    const markerOuterSize = 50
    const markerInnerSize = 30

    const fillMarker =
      '<div key="fill_' +
      ids +
      '" class="marker-icon marker-icon-fill diagonal-stripe-2" style="background-color: ' +
      timeColor(timeSelectionAvg) +
      '" >' +
      markers.length +
      '</div>'

    const strokeMarker =
      '<div key="stroke_' +
      ids +
      '" class="marker-icon marker-icon-stroke" style="border: 2px solid ' +
      markerBorderColor(Base.average(timeSelections)) +
      '" >' +
      '</div>'

    const spaceRadiusDelta = markerOuterSize - markerInnerSize
    const spaceUncertaintyRadius =
      markerInnerSize +
      spaceRadiusDelta * ((spatialCertaintiesAvg - 1) / 2)

    console.log(spaceUncertaintyRadius)
    const spaceUncertaintyMargin =
      (spaceRadiusDelta -
        (spaceUncertaintyRadius - markerInnerSize)) /
      2

    const spaceUncertaintyCircle =
      '<div key="space_uncertainty_' +
      ids +
      '" class="marker-icon marker-icon-certainty-circle" style="background-color: ' +
      Colors.temporal +
      ';width: ' +
      spaceUncertaintyRadius +
      'px;height: ' +
      spaceUncertaintyRadius +
      'px;margin: ' +
      spaceUncertaintyMargin +
      'px 0px 0px ' +
      spaceUncertaintyMargin +
      'px" >' +
      '</div>'

    return L.divIcon({
      html:
        '<div class="marker-icon-wrapper" key="marker_wrapper_' +
        ids +
        '">' +
        spaceUncertaintyCircle +
        fillMarker +
        strokeMarker +
        '</div>',
      className: 'map-marker map-marker-cluster',
      iconSize: L.point(50, 50)
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
          url="http://a.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png"
          attribution="awmc"
          className="map-base-layer-awmc"
        />
        <Pane>
          <MarkerClusterGroup
            showCoverageOnHover={false}
            zoomToBoundsOnClick={true}
            maxClusterRadius={Config.map.clusterRadius}
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
