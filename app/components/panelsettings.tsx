import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

type Props = {
  position: Object
}

export default class PanelSettingsComponent extends React.Component<
  Props
> {
  props
  state
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    return (
      <div
        className="panelfilter-wrapper panel-component panel-top-component"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x
        }}
      >
        settings
      </div>
    )
  }
}
