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

  render() {
    this.store = this.props.stores.filter;

    return (
      <div className="container container-attributes">
        <AttributeSelectionComponent
          columnsNotUsed={this.store.columnsNotUsed}
          handleNewFilterAdd={this.handleNewFilterAdd.bind(this)}
        />
        {this.store.filters.map((filter, fi) => {
          console.log(filter);
          return <AttributeHistogramComponent key={fi} data={filter} />;
        })}
      </div>
    );
  }
}
