import React from 'react'
import { observer } from 'mobx-react'

type Props = {}

class PanelContainer extends React.Component<Props> {
  constructor(props: any) {
    super(props)
  }

  render() {
    return <div className="panel-container">panel</div>
  }
}

export default observer(PanelContainer)
