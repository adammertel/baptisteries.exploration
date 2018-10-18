import React from 'react'
import { Stage, Layer, Rect } from 'react-konva'

import Colors from './../../helpers/colors'

type Props = {
  position: Object
  bars: Array<Object>
  selection: Object
}

export default class TimeProfileComponent extends React.Component<
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
        className="panel-time-profile-wrapper panel-time-component panel-time-middle-component"
        style={{
          top: position.y,
          left: position.x
        }}
      >
        <Stage width={position.w} height={position.h}>
          <Layer key="ticks-lines">
            <Rect
              key="selection-rectangle"
              y={0}
              x={this.props.selection.x}
              width={this.props.selection.w}
              height={position.h}
              fill={'yellow'}
              draggable={true}
              onDragEnd={this.props.onDrag}
              dragBoundFunc={pos => {
                const minX = 0
                const maxX = position.w - this.props.selection.w
                const newX =
                  pos.x > maxX ? maxX : pos.x < minX ? minX : pos.x
                return {
                  x: newX,
                  y: 0
                }
              }}
            />
            {this.props.bars.map((bar, bi) => {
              return (
                <Rect
                  key={bi}
                  x={bar.x}
                  y={bar.y}
                  width={bar.w}
                  height={bar.h}
                  fill={Colors.temporal}
                  fillOpacity={1}
                />
              )
            })}
          </Layer>
        </Stage>
      </div>
    )
  }
}
