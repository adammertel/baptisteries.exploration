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
        className="time-settings-wrapper time-component time-top-component"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          height: position.h,
          width: '100%',
        }}
      >
        <div className="settings-block">
          <div className="text-normal">Timeline ordering</div>
          <div className="">
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
