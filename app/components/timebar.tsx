import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Rect, Text } from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
}

class TimeBarComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    return (
      <div
        className="timebar-wrapper"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x
        }}
      >
        <Stage width={position.w} height={position.h}>
          <Layer>
            {this.props.features.map((feature, fi) => {
              return (
                <Rect
                  key={fi}
                  x={12 * fi}
                  y={feature.y}
                  width={10}
                  height={feature.h}
                  fill="red"
                  shadowBlur={5}
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default TimeBarComponent
