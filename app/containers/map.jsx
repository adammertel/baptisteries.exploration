import React from 'react'
import { observer, action } from 'mobx-react'

export default class MapContainer extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className='map-container'>
        map
      </div>
    )
  }
}
