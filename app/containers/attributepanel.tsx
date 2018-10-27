import React from 'react';
import { observer } from 'mobx-react';
import { SizeModel } from './../helpers/models';
import Base from './../helpers/base';

import AttributeSettingsComponent from './../components/attribute/settings';

type Props = {
  stores: Array<Object>;
  sizes: SizeModel;
};

@observer
export default class TimePanelContainer extends React.Component<Props> {
  props;
  positions;

  constructor(props: any) {
    super(props);
  }

  render() {
    const appStore = this.props.stores.app;

    return (
      <div className="container panel-container-attributes">
        <AttributeSettingsComponent store={appStore} />
        Attribute
      </div>
    );
  }
}
