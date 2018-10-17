import React from 'react'
import { observer } from 'mobx-react'
import MapContainer from './map'
import TimePanelContainer from './timepanel'
import AttributePanelContainer from './attributepanel'
import WelcomeModal from './../modals/welcome'

type Props = {
  stores: Array<Object>
}

@observer
export default class AppContainer extends React.Component<any, any> {
  props
  constructor(props: any) {
    super(props)
  }

  public render() {
    return (
      <div className="container-wrapper">
        <TimePanelContainer stores={this.props.stores} />
        <AttributePanelContainer stores={this.props.stores} />
        <MapContainer stores={this.props.stores} />
        <WelcomeModal />
      </div>
    )
  }
}
