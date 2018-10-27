import React from 'react';

import Base from './../../helpers/base';
import Colors from './../../helpers/colors';

type Props = {
  position: Object;
};

export default class TimeSettingsComponent extends React.Component<Props> {
  props;
  state;
  constructor(props: any) {
    super(props);
  }

  handleOrdedChange(e) {
    console.log('order changing', e.target.value);
    this.props.store.changeSortProp(e.target.value);
  }

  render() {
    const position = this.props.position;
    return (
      <div
        className="panel-time-settings-wrapper columns panel-time-component panel-time-top-component"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          height: position.h,
          width: '100%',
        }}
      >
        <div className="column settings-block right">
          <div className="text-normal">Timeline ordering</div>
          <div className="new-filter">
            <div className="select is-small">
              <select
                value={this.props.store.sortProp.id}
                onChange={this.handleOrdedChange.bind(this)}
              >
                {this.props.store.timeBarOrdering.map(orderAtt => {
                  return (
                    <option value={orderAtt.id} key={orderAtt.id}>
                      {orderAtt.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
