import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'
import { Stage, Layer, Group, Rect, Line, Circle } from 'react-konva'

type Props = {
  position: Object
  bars: Array<Object>
  selection: Object
}

class TimeLineComponent extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position

    console.log(this.props.bars)
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
            <Rect
              key="selection-rectangle"
              y={0}
              x={this.props.selection.y}
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

export default TimeLineComponent
