import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Text } from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
}

export default class TimeLegendComponent extends React.Component<
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
        className="timebar-wrapper"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x
        }}
      >
        <Stage width={position.w} height={position.h}>
          <Layer>
            {this.props.ticks.map((tick, ti) => {
              return (
                <Text
                  key={ti}
                  x={20}
                  y={tick.y}
                  text={tick.date}
                  color="black"
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}
