  import React from 'react'
import { Stage, Layer, Group, Rect, Line, Circle } from 'react-konva'

import Base from './../../helpers/base'
import Colors from './../../helpers/colors'
import sizes from './../../helpers/sizes'

type Props = {
  position: Object
  bars: Array<Object>
  ticks: Array<Object>
  offset: number
}

export default class TimeBarchartComponent extends React.Component<
  Props
> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position

    const barSize = sizes.values.time.bars
    const barWidth = barSize.width

    const barSpace = sizes.values.time.bars.space
    const bars = this.props.bars

    const offSet = this.props.offset

    return (
      <div
        className="panel-time-barchart-wrapper panel-time-component panel-time-middle-component"
        style={{
          top: position.y,
          left: position.x
        }}
      >
        <Stage
          width={position.w}
          height={position.h}
          offsetX={offSet}
        >
          <Layer key="ticks-lines">
            {this.props.ticks.map((tick, ti) => {
              const x1 = offSet
              const x2 = offSet + position.w
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
              y={this.props.margin}
              height={position.h - 2 * this.props.margin}
              width={this.props.inMapArea}
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
              const inMap = feature.space

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
          <Layer key="selected-times">
            <Line
              key="max"
              points={[
                offSet + 0,
                this.props.selectedMinDateY,
                offSet + position.w,
                this.props.selectedMinDateY
              ]}
              stroke={Colors.active}
              strokeWidth={2}
              dash={[5, 5]}
            />
            <Line
              key="min"
              points={[
                offSet + 0,
                this.props.selectedMaxDateY,
                offSet + position.w,
                this.props.selectedMaxDateY
              ]}
              stroke={Colors.active}
              strokeWidth={2}
              dash={[5, 5]}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}
