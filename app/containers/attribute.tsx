import React from 'react';
import { observer } from 'mobx-react';
import Base from './../helpers/base';

import AttributeSelectionComponent from './../components/attribute/selection';
import AttributeHistogramComponent from './../components/attribute/histogram';

type Props = {
  stores: Array<Object>;
};

@observer
export default class AttributeContainer extends React.Component<Props> {
  props;
  positions;
  store;

  constructor(props: any) {
    super(props);
  }

  handleNewFilterAdd(e): void {
    const newColumn = e.target.value;
    this.store.addNew(newColumn);
  }

  handleCancelInspect(e) {
    this.props.stores.app.changeInspectedIds([]);
  }

  handleInspectMarkers(column, bar) {
    const ids = this.props.stores.data.features
      .filter(f => {
        const value = f.props[column.id];
        return bar.check(value);
      })
      .map(f => f.props.id);
    console.log(ids);
    this.props.stores.app.changeInspectedIds(ids);
  }

  render() {
    this.store = this.props.stores.filter;

    return (
      <div className="container container-attributes">
        <AttributeSelectionComponent
          columnsNotUsed={this.store.columnsNotUsed}
          handleNewFilterAdd={this.handleNewFilterAdd.bind(this)}
        />
        {this.store.filters.map((filter, fi) => {
          return (
            <AttributeHistogramComponent
              handleCancelInspect={this.handleCancelInspect.bind(this)}
              handleInspectMarkers={this.handleInspectMarkers.bind(this)}
              key={fi}
              data={filter}
            />
          );
        })}
      </div>
    );
  }
}
