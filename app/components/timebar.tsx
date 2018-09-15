import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'
import { Stage, Layer, Rect, Line, Circle } from 'react-konva'
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
    const barStroke = 8
    const barHl = 10
    const barMargin = 4
    const barSpace = barStroke + barMargin

    const bars = this.props.bars

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
          <Layer key="ticks-lines">
            {this.props.ticks.map((tick, ti) => {
              const x1 = 0
              const x2 = position.w
              const y = tick.y

              return (
                <Line
                  key={ti}
                  points={[x1, y, x2, y]}
                  stroke={Colors.passive}
                  strokeWidth={0.5}
                />
              )
            })}
          </Layer>

          <Layer key="bars-space">
            {bars
              .filter(t => !t.circle)
              .filter(f => f.spatial)
              .map((feature, fi) => {
                const x =
                  barSpace / 2 - barWidth / 2 + feature.x * barSpace
                return (
                  <Rect
                    key={fi}
                    x={x}
                    y={feature.y}
                    width={barWidth}
                    height={feature.h}
                    fill={feature.fill}
                    stroke={Colors.temporal}
                    strokeWidth={1}
                  />
                )
              })}
          </Layer>
          <Layer key="bars-outside">
            {bars
              .filter(t => !t.circle)
              .filter(f => !f.spatial)
              .map((feature, fi) => {
                const x =
                  barSpace / 2 - barWidth / 2 + feature.x * barSpace
                return (
                  <Rect
                    key={fi}
                    x={x}
                    y={feature.y}
                    width={barWidth}
                    height={feature.h}
                    fill={Colors.passive}
                  />
                )
              })}
          </Layer>
          <Layer key="bars-circles-space">
            {bars
              .filter(t => t.circle)
              .filter(f => f.spatial)
              .map((feature, fi) => {
                const x = barSpace - barWidth + feature.x * barSpace
                return (
                  <Circle
                    key={fi}
                    x={x}
                    y={feature.y}
                    radius={barWidth / 2}
                    fill={feature.fill}
                    stroke={Colors.temporal}
                  />
                )
              })}
          </Layer>
          <Layer key="bars-circles-passive">
            {bars
              .filter(f => !f.spatial)
              .filter(t => t.circle)
              .map((feature, fi) => {
                const x = barSpace - barWidth + feature.x * barSpace
                return (
                  <Circle
                    key={fi}
                    x={x}
                    y={feature.y}
                    radius={barWidth / 2}
                    fill={Colors.passive}
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
