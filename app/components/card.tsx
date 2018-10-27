import React from 'react';
import { observer } from 'mobx-react';

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
    return {};
  }

  render() {
    return (
      <div className="section">
        <div
          className="tabs is-boxed"
          style={{ marginBottom: 0, marginLeft: '-1px' }}
        >
          <ul>
            {this.props.tabs.map(tab => {
              return (
                <li
                  className={this.state.activeTab === tab.id ? 'is-active' : ''}
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
        <div className="card">
          <header className="card-header" />
          <div className="card-content">
            <div className="content">{this.activeTabContent()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default observer(Card);
