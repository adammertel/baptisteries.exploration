import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Rect, Text } from 'react-konva'
import Konva from 'konva'

type Props = {
  width: Number
  height: Number
  x: Number
  y: Number
}

class TimeBarComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const width = this.props.width
    const height = this.props.height
    return (
      <div
        className="timebar-wrapper"
        style={{
          position: 'absolute',
          top: this.props.x,
          left: this.props.y
        }}
      >
        <Stage width={width} height={height}>
          <Layer>
            {this.props.features.map((feature, fi) => {
              return (
                <Rect
                  key={fi}
                  x={50 + 12 * fi}
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
