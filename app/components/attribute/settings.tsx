import React from 'react'

import Base from './../../helpers/base'
import Colors from './../../helpers/colors'

type Props = {
  position: Object
}

export default class AttributeSettingsComponent extends React.Component<
  Props
> {
  props
  state
  constructor(props: any) {
    super(props)
  }

  handleOrdedChange(e) {
    console.log('order changing', e.target.value)
    this.props.store.changeSortProp(e.target.value)
  }

  render() {
    return (
      <div
        className="panel-attribute-settings-wrapper panel-attribute-component"
        style={{}}
      >
        <h3 className="title is-3">ATTRIBUTES</h3>
        <div className="new-filter">
          <div className="select is-small" />
        </div>
      </div>
    )
  }
}
