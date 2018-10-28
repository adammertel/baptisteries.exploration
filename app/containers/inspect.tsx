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
    return (
      <div className="inspect-single inspect-content">
        <div className="line line-strong">{feature.props.name}</div>
        <div className="line">
          <span className="definition">time</span>
          {feature.props.date_after} - {feature.props.date_before}
        </div>
        <div className="line">
          <span className="definition">ciborium</span>
          {feature.props.ciborium ? 'yes' : 'no'}
        </div>
        <div className="line">
          <span className="definition">building shape</span>
          {feature.props.shape}
        </div>
        <div className="line">
          <span className="definition">piscina shape</span>
          {feature.props.piscina_shape}
        </div>
      </div>
    );
  }

  _renderCluster(features) {
    console.log(features);
    return (
      <div className="inspect-cluster inspect-content">
        <div className="line line-strong">
          cluster with {features.length} elements
        </div>
        <div>{features.map(f => f.props.name).join(', ')}</div>
      </div>
    );
  }

  render() {
    const appStore = this.props.stores.app;
    const features = this.props.stores.app.inspectedFeatures;

    return (
      <div className="container container-inspect">
        {features.length === 1 && this._renderSingle(features[0])}
        {features.length > 1 && this._renderCluster(features)}
      </div>
    );
  }
}
