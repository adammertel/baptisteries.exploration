import React from 'react';

export default class AttributeSelectionComponent extends React.Component {
  props;
  state;
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="panelfilter-wrapper panel-component panel-top-component">
        <div className="first-line panel-top-component-line">
          <div className="new-filter">
            <div className="select is-small is-secondary">
              <select onChange={this.props.handleNewFilterAdd}>
                <option>Select attribute to filter</option>
                {this.props.columnsNotUsed.map(column => {
                  return (
                    <option value={column.id} key={column.id}>
                      {column.label}
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
