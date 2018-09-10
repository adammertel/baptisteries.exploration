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
    const fontSize = 10
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
                  x={0}
                  fontSize={fontSize}
                  y={tick.y - fontSize / 2}
                  verticalAlign="bottom"
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
