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

  render() {
    const appStore = this.props.stores.app;

    return <div className="container container-inspect">inspect</div>;
  }
}
