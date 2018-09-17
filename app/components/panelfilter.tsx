import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

type Props = {
  position: Object
}

export default class PanelFilterComponent extends React.Component<
  Props
> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    return (
      <div
        className="panelfilter-wrapper"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x
        }}
      />
    )
  }
}
