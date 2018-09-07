import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

type Props = {}

class MapContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div className="map-container">map</div>
  }
}

export default observer(MapContainer)
