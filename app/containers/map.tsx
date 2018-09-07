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

  features() {
    return window['stores'].app.features
  }

  render() {
    const mapStore = this.props.stores.map
    const features = this.features()
    return (
      <div className="container map-container">
        <MapComponent
          store={this.props.stores.map}
          handleViewportChange={this.handleViewportChange.bind(this)}
          center={mapStore.center}
          zoom={mapStore.zoom}
          features={features}
        />
      </div>
    )
  }
}

export default observer(MapContainer)
