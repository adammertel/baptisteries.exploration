import React from 'react';
import { observer } from 'mobx-react';
import { SizeModel } from './../helpers/models';
import Base from './../helpers/base';

type Props = {
  stores: Array<Object>;
  sizes: SizeModel;
};

@observer
export default class InspectContainer extends React.Component<Props> {
  props;
  positions;

  constructor(props: any) {
    super(props);
  }

  _renderSingle(feature) {
    return <div>single</div>;
  }

  _renderCluster(features) {
    return <div>cluster</div>;
  }

  render() {
    const appStore = this.props.stores.app;
    const features = this.props.stores.app.inspectedFeatures;
    console.log(features);

    return (
      <div className="container container-inspect">
        {features.length === 1 && this._renderSingle(features[0])}
        {features.length > 1 && this._renderCluster(features)}
      </div>
    );
  }
}
