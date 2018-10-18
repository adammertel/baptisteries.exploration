import React from 'react'
import { observer } from 'mobx-react'
import DevTools from 'mobx-react-devtools'

import MapContainer from './map'
import TimePanelContainer from './timepanel'
import AttributePanelContainer from './attributepanel'
import WelcomeModal from './../modals/welcome'
import Base from './../helpers/base'

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
    console.log('app')
    const screenStore = this.props.stores.screen
    return (
      <div className="container-wrapper">
        <TimePanelContainer
          stores={this.props.stores}
          sizes={screenStore._timePanelSizes}
        />
        <AttributePanelContainer
          stores={this.props.stores}
          sizes={screenStore._attributePanelSizes}
        />
        <MapContainer
          stores={this.props.stores}
          sizes={screenStore._mapPanelSizes}
        />
        <WelcomeModal />
        <DevTools />
      </div>
    )
  }
}
