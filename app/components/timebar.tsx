import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'
import { Stage, Layer, Group, Rect, Line, Circle } from 'react-konva'
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
    const barMargin = 2
    const barSpace = barStroke + barMargin

    const bars = this.props.bars

    return (
      <div
        className="timebar-wrapper panel-component panel-middle-component"
        style={{
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
          <Layer key="in-map-area">
            <Rect
              x={0}
              y={0}
              height={position.h}
              width={bars.filter(f => f.spatial).length * barSpace}
              fill={Colors.temporal}
              opacity={0.2}
            />
          </Layer>
          <Layer key="bars-rectangles">
            {bars.filter(t => !t.circle).map((feature, fi) => {
              const x =
                barSpace / 2 - barWidth / 2 + feature.x * barSpace

              // existence certainty
              let gradientRatio = 1
              if (feature.existence === 2) {
                gradientRatio = 0.6
              } else if (feature.existence === 3) {
                gradientRatio = 0.3
              }

              const gradient = gradientRatio !== 1
              const inMap = feature.spatial

              return (
                <Group key={fi + '_group'}>
                  {feature.attributional === 'highlighted' && (
                    <Rect
                      key={fi + '_attribute'}
                      x={x}
                      y={feature.y}
                      width={barWidth}
                      height={feature.h}
                      stroke={Colors.attribute}
                      strokeWidth={5}
                      fill=""
                    />
                  )}
                  <Rect
                    key={fi}
                    x={x}
                    y={feature.y}
                    width={barWidth}
                    height={feature.h}
                    fillLinearGradientStartPoint={
                      gradient && {
                        x: 0,
                        y: 0
                      }
                    }
                    fillLinearGradientEndPoint={{
                      x: feature.h,
                      y: feature.h
                    }}
                    fillLinearGradientColorStops={
                      gradient &&
                      Base.konvaStripes(
                        feature.fill,
                        feature.h,
                        5,
                        gradientRatio
                      )
                    }
                    fill={gradient ? '' : feature.fill}
                  />
                </Group>
              )
            })}
          </Layer>

          <Layer key="bars-circles">
            {bars.filter(t => t.circle).map((feature, fi) => {
              const x = barSpace - barWidth + feature.x * barSpace

              let gradientRatio = 1
              if (feature.existence === 2) {
                gradientRatio = 0.8
              } else if (feature.existence === 3) {
                gradientRatio = 0.6
              }

              const gradient = gradientRatio !== 1
              const inMap = feature.spatial

              return (
                <Group key={fi + '_group'}>
                  {feature.attributional === 'highlighted' && (
                    <Circle
                      key={fi + '_attribute'}
                      x={x}
                      y={feature.y}
                      radius={barWidth}
                      fill={Colors.attribute}
                      stroke=""
                    />
                  )}
                  <Circle
                    key={fi}
                    x={x}
                    y={feature.y}
                    radius={barWidth / 2}
                    fill={gradient ? '' : feature.fill}
                    fillLinearGradientStartPoint={
                      gradient && {
                        x: -barWidth / 2,
                        y: -barWidth / 2
                      }
                    }
                    fillLinearGradientEndPoint={{
                      x: barWidth / 2,
                      y: barWidth / 2
                    }}
                    fillLinearGradientColorStops={
                      gradient &&
                      Base.konvaStripes(
                        feature.fill,
                        barWidth * 2,
                        4,
                        gradientRatio
                      )
                    }
                  />
                </Group>
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default TimeBarComponent
