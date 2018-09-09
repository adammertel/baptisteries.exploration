import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'

import { Stage, Layer, Rect, Text } from 'react-konva'
import Konva from 'konva'

type Props = {
  position: Object
}

class TimeSelect extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  render() {
    const position = this.props.position
    const maxDateY = 100
    const minDateY = 250
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
              width={10}
              y={0}
              x={10}
              height={position.h}
              stroke="black"
            />
            <Rect
              key="min-date-range"
              width={10}
              height={minDateY - maxDateY}
              x={10}
              y={maxDateY}
              stroke="orange"
              fill="orange"
            />
            <Rect
              key="max-date-handler"
              width={30}
              height={10}
              x={0}
              y={maxDateY}
              stroke="red"
              fill="orange"
            />
            <Rect
              key="min-date-handler"
              width={30}
              height={10}
              x={0}
              y={minDateY}
              stroke="red"
              fill="orange"
            />
          </Layer>
        </Stage>
      </div>
    )
  }
}

export default TimeSelect
