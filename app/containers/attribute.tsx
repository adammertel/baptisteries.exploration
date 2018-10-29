import React from 'react';
import { observer } from 'mobx-react';
import { SizeModel } from './../helpers/models';
import Base from './../helpers/base';

import AttributeFilterSelectionComponent from './../components/attribute/filterselection';

type Props = {
  stores: Array<Object>;
  sizes: SizeModel;
};

@observer
export default class AttributeContainer extends React.Component<Props> {
  props;
  positions;

  constructor(props: any) {
    super(props);
  }

  handleNewFilterAdd(e): void {
    const newColumn = e.target.value;
    this.props.stores.filter.addNew(newColumn);
  }

  render() {
    const appStore = this.props.stores.app;

    return (
      <div className="container container-attributes">
        <AttributeFilterSelectionComponent
          columnsNotUsed={this.props.stores.filter.columnsNotUsed}
          handleNewFilterAdd={this.handleNewFilterAdd.bind(this)}
        />
      </div>
    );
  }
}
