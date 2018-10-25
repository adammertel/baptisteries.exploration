import React from 'react'
import { Stage, Layer, Text } from 'react-konva'

import Base from './../../helpers/base'
import Colors from './../../helpers/colors'

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
        className="panel-time-legend-wrapper panel-time-component panel-time-middle-component"
        style={{
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
                  stroke={Colors.passive}
                  strokeWidth={0.5}
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}
