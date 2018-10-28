import React from 'react';
import { observer } from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import MapContainer from './map';
import TimePanelContainer from './timepanel';
import AttributePanelContainer from './attributepanel';
import InspectContainer from './inspect';
import WelcomeModal from './../modals/welcome';
import Base from './../helpers/base';
import Card from './../components/card';
import Hero from './../components/hero';

import 'font-awesome/scss/font-awesome.scss';

@observer
export default class AppContainer extends React.Component<any, any> {
  props;
  constructor(props: any) {
    super(props);
  }

  public render() {
    const screenHeight = Base.screenHeight();
    const heroHeight = 50;
    const bottomHeight = 20;
    const heights = {
      hero: heroHeight,
      firstLine: (screenHeight - heroHeight) / 2,
      secondLine: (screenHeight - heroHeight) / 2 - bottomHeight,
    };
    const screenStore = this.props.stores.screen;

    return (
      <div className="container-wrapper">
        <Hero stores={this.props.stores} height={heights.hero} />
        <div style={{ padding: '0.5rem' }}>
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
                  cardHeight={'calc(50% - 1rem)'}
                  tabs={[
                    {
                      id: '1',
                      label: 'Settings',
                      icon: 'cog',
                      content: <div />,
                    },
                  ]}
                />
              </div>
              <div className="column half-sized is-full">
                <Card
                  cardHeight={'calc(50% - 1rem)'}
                  tabs={[
                    {
                      id: '1',
                      label: 'Inspect',
                      icon: 'search',
                      content: <InspectContainer stores={this.props.stores} />,
                    },
                  ]}
                />
              </div>
            </div>
            <div className="column is-three-quarter">
              <Card
                cardHeight={'calc(100% - 1rem)'}
                tabs={[
                  {
                    id: '1',
                    label: 'Map',
                    icon: 'globe',
                    content: <MapContainer stores={this.props.stores} />,
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
            <div className="column is-one-third">
              <Card
                cardHeight={'calc(100% - 50px)'}
                tabs={[
                  {
                    id: '1',
                    label: 'Attributes',
                    icon: 'filter',
                    content: (
                      <AttributePanelContainer stores={this.props.stores} />
                    ),
                  },
                ]}
              />
            </div>
            <div className="column is-two-third">
              <Card
                cardHeight={'calc(100% - 50px)'}
                tabs={[
                  {
                    id: '1',
                    label: 'Time',
                    icon: 'calendar-o',
                    content: (
                      <TimePanelContainer
                        sizes={{
                          width: () => (Base.screenWidth() / 3) * 2,
                          height: () => Base.screenHeight() / 2,
                        }}
                        stores={this.props.stores}
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
