import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Rect, Text } from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
  minDateY: number
  maxDateY: number
}

class TimeSelect extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    const maxDateY = this.props.maxDateY
    const minDateY = this.props.minDateY

    const handlerH = 10
    const handlerW = 30
    const pipeW = 10
    const marginLeft = (handlerW - pipeW) / 2

    return (
      <div
        className="timeselect-wrapper"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x
        }}
      >
        <Stage width={position.w} height={position.h}>
          <Layer>
            <Rect
              key="background"
              width={pipeW}
              y={0}
              x={marginLeft}
              height={position.h}
              stroke="black"
            />
            <Rect
              key="date-range"
              width={pipeW}
              height={minDateY - maxDateY}
              x={marginLeft}
              y={maxDateY}
              stroke="black"
              fill="orange"
            />
            <Rect
              key="max-date-handler"
              width={handlerW}
              height={handlerH}
              x={0}
              y={this.props.maxDateY - handlerH / 2}
              stroke="red"
              fill="orange"
              draggable={true}
              onDragEnd={this.props.onDragMax}
              dragBoundFunc={pos => {
                const maxY = this.props.minDateY
                const minY = this.props.margin + handlerH / 2
                const newY =
                  pos.y > maxY ? maxY : pos.y < minY ? minY : pos.y

                return {
                  x: 0,
                  y: newY
                }
              }}
            />
            <Rect
              key="min-date-handler"
              width={handlerW}
              height={handlerH}
              x={0}
              y={this.props.minDateY - handlerH / 2}
              stroke="red"
              fill="orange"
              draggable={true}
              onDragEnd={this.props.onDragMin}
              dragBoundFunc={pos => {
                const maxY =
                  this.props.position.h -
                  handlerH / 2 -
                  this.props.margin
                const minY = this.props.maxDateY
                const newY =
                  pos.y > maxY ? maxY : pos.y < minY ? minY : pos.y

                return {
                  x: 0,
                  y: newY
                }
              }}
            />
            <Text
              key="min-date-label"
              x={35}
              y={this.props.minDateY - handlerH / 2 + 3}
              stroke="red"
              text={this.props.minDate}
            />
            <Text
              key="max-date-label"
              x={35}
              y={this.props.maxDateY - handlerH / 2 - 3}
              stroke="red"
              text={this.props.maxDate}
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default TimeSelect
