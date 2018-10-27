import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import MapContainer from './map';
import TimePanelContainer from './timepanel';
import AttributePanelContainer from './attributepanel';
import WelcomeModal from './../modals/welcome';
import Base from './../helpers/base';
import Card from './../components/card';
import Hero from './../components/hero';

import 'font-awesome/scss/font-awesome.scss';

type Props = {
  stores: Array<Object>;
};

@observer
export default class AppContainer extends React.Component<any, any> {
  props;
  constructor(props: any) {
    super(props);
  }

  public render() {
    console.log('app');
    const screenStore = this.props.stores.screen;
    return (
      <div className="container-wrapper">
        <Hero stores={this.props.stores} />
        <div className="columns">
          <div className="column is-one-quarter">
            <Card
              sizes={screenStore._timePanelSizes}
              tabs={[
                {
                  id: '1',
                  label: 'Settings',
                  icon: 'filter',
                  content: (
                    <AttributePanelContainer
                      stores={this.props.stores}
                      sizes={screenStore._attributePanelSizes}
                    />
                  ),
                },
              ]}
            />
          </div>
          <div className="column is-three-quarter">
            <Card
              sizes={screenStore._timePanelSizes}
              tabs={[
                {
                  id: '1',
                  label: 'Map',
                  icon: 'filter',
                  content: (
                    <MapContainer
                      stores={this.props.stores}
                      sizes={screenStore._mapPanelSizes}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>
        <div className="columns">
          <div className="column is-two-third">
            <Card
              sizes={screenStore._timePanelSizes}
              tabs={[
                {
                  id: '1',
                  label: 'Time',
                  icon: 'calendar-o',
                  content: (
                    <TimePanelContainer
                      sizes={screenStore._timePanelSizes}
                      stores={this.props.stores}
                    />
                  ),
                },
              ]}
            />
          </div>

          <div className="column is-one-third">
            <Card
              sizes={screenStore._timePanelSizes}
              tabs={[
                {
                  id: '1',
                  label: 'Attributes',
                  icon: 'filter',
                  content: (
                    <AttributePanelContainer
                      stores={this.props.stores}
                      sizes={screenStore._attributePanelSizes}
                    />
                  ),
                },
              ]}
            />
          </div>
        </div>

        <WelcomeModal />
        <DevTools />
      </div>
    );
  }
}
