import React from 'react';
import { observer } from 'mobx-react';
import { SizeModel } from './../helpers/models';
import Base from './../helpers/base';

import AttributeSettingsComponent from './../components/attribute/settings';
import AttributeFilterComponent from './../components/attribute/filter';

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

  render() {
    const appStore = this.props.stores.app;

    return (
      <div className="container container-attributes">
        <AttributeSettingsComponent store={appStore} />
        <AttributeFilterComponent stores={this.props.stores} />
        Attribute
      </div>
    );
  }
}
