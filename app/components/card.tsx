import React from 'react';
import { observer } from 'mobx-react';
import Base from 'mobx-react';

type Props = {
  tabs: Array<Object>;
};

type State = {
  activeTab: string;
};

class Card extends React.Component<Props, State> {
  state;
  props;
  setState;
  constructor(props) {
    super(props);
    this.state = {
      activeTab: this.props.tabs[0].id,
    };
  }

  handleChangeTab(newTabId) {
    if (this.props.tabs.find(tab => tab.id === newTabId)) {
      this.setState({
        activeTab: newTabId,
      });
    }
  }

  activeTabContent() {
    const activeTab = this.props.tabs.find(
      tab => tab.id === this.state.activeTab
    );
    if (activeTab) {
      return activeTab.content;
    } else {
      return <div />;
    }
  }

  style() {
    return {
      padding: '.5rem',
    };
    const cardStyle = {
      position: 'absolute',
    };
    return { ...cardStyle, ...this.props.sizes };
  }

  render() {
    return (
      <div className="section" style={this.style()}>
        <div className="tabs is-boxed" style={{ margin: 0 }}>
          <ul>
            {this.props.tabs.map(tab => {
              return (
                <li
                  className={
                    this.state.activeTab === tab.id
                      ? 'is-primary is-active'
                      : ''
                  }
                  onClick={this.handleChangeTab.bind(this, tab.id)}
                  key={tab.id}
                >
                  <a>
                    <span className="icon is-small">
                      <i className={'fa fa-' + tab.icon} aria-hidden="true" />
                    </span>
                    <span>{tab.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="card" style={{ height: this.props.cardHeight }}>
          {this.activeTabContent()}
        </div>
      </div>
    );
  }
}

export default observer(Card);
