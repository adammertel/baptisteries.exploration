import React from 'react'
import { observer, action } from 'mobx-react'
import Base from './../helpers/base'

type Props = {}

export default class MapContainer extends React.Component<Props> {
  constructor (props: any) {
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
