import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

import {
  Stage,
  Layer,
  Rect,
  Text,
  Group,
  RegularPolygon
} from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
  selectedMinDateY: number
  selectedMaxDateY: number
}

class TimeSelect extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    const selectedMaxDateY = this.props.selectedMaxDateY
    const selectedMinDateY = this.props.selectedMinDateY

    const handlerH = 10
    const handlerW = 30
    const handlerX = position.w / 2 - handlerW / 2
    const pipeW = 10

    const minTextY = this.props.selectedMinDateY - handlerH / 2
    const maxTextY = this.props.selectedMaxDateY - handlerH / 2
    const minTextX = 5
    const maxTextX = position.w - 30
    const triangleR = 8

    return (
      <div
        className="timeselect-wrapper panel-component panel-middle-component"
        style={{
          top: position.y,
          left: position.x
        }}
      >
        <Stage width={position.w} height={position.h}>
          <Layer>
            <Group key="pipe" x={position.w / 2 - pipeW / 2}>
              <Rect
                key="background"
                width={pipeW}
                y={this.props.margin}
                height={position.h - 2 * this.props.margin}
                stroke={Colors.passive}
              />
              <Rect
                key="date-range"
                width={pipeW}
                height={selectedMinDateY - selectedMaxDateY}
                y={selectedMaxDateY}
                stroke={Colors.passive}
                fill={Colors.passive}
              />
            </Group>
            <Group key="handlers" x={handlerX}>
              <Rect
                key="max-date-handler"
                width={handlerW}
                fill={Colors.active}
                height={handlerH}
                y={this.props.selectedMaxDateY - handlerH / 2}
                draggable={true}
                onDragEnd={this.props.onDragMax}
                dragBoundFunc={pos => {
                  const maxY = this.props.selectedMinDateY
                  const minY = this.props.margin
                  console.log(minY)
                  const newY =
                    pos.y > maxY ? maxY : pos.y < minY ? minY : pos.y

                  return {
                    x: handlerX,
                    y: newY
                  }
                }}
              />
              <Rect
                key="min-date-handler"
                fill={Colors.active}
                width={handlerW}
                height={handlerH}
                y={this.props.selectedMinDateY - handlerH / 2}
                draggable={true}
                onDragEnd={this.props.onDragMin}
                dragBoundFunc={pos => {
                  const maxY =
                    this.props.position.h - this.props.margin
                  const minY = this.props.selectedMaxDateY
                  const newY =
                    pos.y > maxY ? maxY : pos.y < minY ? minY : pos.y

                  return {
                    x: handlerX,
                    y: newY
                  }
                }}
              />
            </Group>
            <Group x={minTextX} y={minTextY} key="min-date">
              <Text
                key="min-date-label"
                stroke={Colors.active}
                strokeWidth={1}
                align="center"
                text={this.props.minDate}
              />
              {this.props.minDateY !== selectedMinDateY && (
                <RegularPolygon
                  key="minus"
                  sides={3}
                  radius={triangleR}
                  fill={Colors.active}
                  offsetX={-3 * triangleR}
                  offsetY={0}
                  rotation={60}
                />
              )}
              <RegularPolygon
                key="plus"
                sides={3}
                radius={triangleR}
                fill={Colors.active}
                offsetX={-1.5 * triangleR}
                offsetY={triangleR}
              />
            </Group>
            <Group x={maxTextX} y={maxTextY} key="max-date">
              <Text
                key="max-date-label"
                strokeWidth={1}
                stroke={Colors.active}
                align="center"
                text={this.props.maxDate}
              />
              {this.props.maxDateY !== selectedMaxDateY && (
              <RegularPolygon
                key="plus"
                sides={3}
                radius={triangleR}
                fill={Colors.active}
                offsetX={-1.5 * triangleR}
                offsetY={triangleR}
              />
              }
              <RegularPolygon
                key="minus"
                sides={3}
                radius={triangleR}
                fill={Colors.active}
                offsetX={-3 * triangleR}
                offsetY={0}
                rotation={60}
              />
            </Group>
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default TimeSelect
