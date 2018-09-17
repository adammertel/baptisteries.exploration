import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

type Props = {
  position: Object
}

export default class PanelFilterComponent extends React.Component<
  Props
> {
  props
  state
  constructor(props: any) {
    super(props)
    this.state = {
      newFilterValue: false
    }
  }

  render() {
    const position = this.props.position
    return (
      <div
        className="panelfilter-wrapper"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          padding: 10
        }}
      >
        Filters :{' '}
        <div className="select is-small">
          <select value={this.state.newFilterValue}>
            {}
            <option>Select attribute to filter</option>
            <option>With options</option>
          </select>
        </div>
      </div>
    )
  }
}
