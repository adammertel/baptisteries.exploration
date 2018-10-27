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
import { isAbsolute } from 'path';

@observer
export default class AppContainer extends React.Component<any, any> {
  props;
  constructor(props: any) {
    super(props);
  }

  public render() {
    const screenHeight = Base.screenHeight();
    const heroHeight = 50;
    const heights = {
      hero: heroHeight,
      firstLine: (screenHeight - heroHeight) / 2,
      secondLine: (screenHeight - heroHeight) / 2,
    };
    const screenStore = this.props.stores.screen;
    return (
      <div className="container-wrapper">
        <Hero stores={this.props.stores} height={heights.hero} />
        <div style={{ padding: '1rem' }}>
          <div
            className="columns"
            style={{
              position: 'relative',
              height: heights.firstLine,
              width: '100%',
            }}
          >
            <div className="column is-one-quarter">
              <div className="column half-sized is-full">
                <Card
                  cardHeight={'calc(50% - 30px)'}
                  tabs={[
                    {
                      id: '1',
                      label: 'Settings',
                      icon: 'filter',
                      content: <div />,
                    },
                  ]}
                />
              </div>
              <div className="column half-sized is-full">
                <Card
                  cardHeight={'calc(50% - 30px)'}
                  tabs={[
                    {
                      id: '1',
                      label: 'Inspect',
                      icon: 'search',
                      content: (
                        <div>
                          dashdioashidsaiodh
                          asodhasiodjasiohdioashdioasdpiashdpashdpashp
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            </div>
            <div className="column is-three-quarter">
              <Card
                cardHeight={'calc(100% - 30px)'}
                tabs={[
                  {
                    id: '1',
                    label: 'Map',
                    icon: 'globe',
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
          <div
            className="columns"
            style={{
              position: 'relative',
              height: heights.secondLine,
              width: '100%',
            }}
          >
            <div className="column is-two-third">
              <Card
                cardHeight={'calc(100% - 30px)'}
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
                cardHeight={'calc(100% - 30px)'}
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
        </div>

        <WelcomeModal />
        <DevTools />
      </div>
    );
  }
}
