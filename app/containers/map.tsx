import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

type Props = {
  stores: Array<Object>
}

class MapContainer extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div className="map-container" store={this.props.stores.map}>
        map
      </div>
    )
  }
}

export default observer(MapContainer)
