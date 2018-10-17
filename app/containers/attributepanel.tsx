import React from 'react'
import { observer } from 'mobx-react'
import { SizeModel } from './../helpers/models'
import Base from './../helpers/base'

type Props = {
  stores: Array<Object>
  sizes: SizeModel
}

@observer
export default class TimePanelContainer extends React.Component<
  Props
> {
  props
  positions
  _middleTM // margin of y for the middle components

  constructor(props: any) {
    super(props)
  }

  render() {
    return (
      <div
        style={Base.applySizeStyle(this.props.sizes, {})}
        className="container panel-container-attributes"
      >
        Attribute
      </div>
    )
  }
}
