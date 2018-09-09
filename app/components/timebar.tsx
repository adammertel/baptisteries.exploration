import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Rect, Line } from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
  bars: Array<Object>
  ticks: Array<Object>
}

class TimeBarComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    const barWidth = 6
    const barHl = 10
    const barMargin = 4
    const barSpace = barWidth + barMargin

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
          <Layer key="bars-hl">
            {this.props.bars
              .filter(f => f.spatial)
              .map((feature, fi) => {
                const x =
                  barSpace / 2 - barHl / 2 + feature.x * barSpace
                return (
                  <Rect
                    key={fi}
                    x={x}
                    y={feature.y}
                    width={barHl}
                    height={feature.h}
                    fill="yellow"
                  />
                )
              })}
          </Layer>
          <Layer key="bars">
            {this.props.bars.map((feature, fi) => {
              const x =
                barSpace / 2 - barWidth / 2 + feature.x * barSpace
              return (
                <Rect
                  key={fi}
                  x={x}
                  y={feature.y - (barHl - barWidth) / 2}
                  width={barWidth}
                  height={feature.h + (barHl - barWidth)}
                  fill="red"
                />
              )
            })}
          </Layer>
          <Layer key="ticks-lines">
            {this.props.ticks.map((tick, ti) => {
              const x1 = 0
              const x2 = position.w
              const y = tick.y

              return (
                <Line
                  key={ti}
                  points={[x1, y, x2, y]}
                  stroke="black"
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

export default TimeBarComponent
