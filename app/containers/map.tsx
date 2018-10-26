import React from "react";
import { observer } from "mobx-react";
import Base from "./../helpers/base";
import MapComponent from "./../components/map";
import { timeColor } from "./../helpers/feature";
import { Marker } from "react-leaflet";
import { SizeModel } from "./../helpers/models";

type Props = {
  stores: Array<Object>;
  sizes: SizeModel;
};

@observer
export default class MapContainer extends React.Component<Props> {
  props;

  constructor(props: any) {
    super(props);
  }

  handleViewportChange(newCenter, newZoom, newBounds) {
    const sw = newBounds.getSouthWest();
    const ne = newBounds.getNorthEast();
    this.props.stores.map.mapMoved(newCenter, newZoom, [
      [sw.lat, sw.lng],
      [ne.lat, ne.lng]
    ]);
  }

  points(features) {
    console.log("drawing points");
    return features.filter(f => f.selection.space).map((feature, ri) => {
      return (
        <Marker
          fillColor={timeColor(feature.selection.time)}
          fillOpacity="1"
          weight="0"
          key={feature.props.id}
          radius={10}
          position={feature.geo}
          data={feature}
        />
      );
    });
  }

  render() {
    console.log("map");
    const mapStore = this.props.stores.map;
    const features = this.props.stores.app.activeFeatures;

    return (
      <div
        style={Base.applySizeStyle(this.props.sizes, {})}
        className="container map-container"
      >
        <MapComponent
          handleViewportChange={this.handleViewportChange.bind(this)}
          extent={mapStore.extent}
          sizes={this.props.sizes}
          zoom={mapStore.zoom}
          center={mapStore.center}
          points={this.points(features)}
        />
      </div>
    );
  }
}
