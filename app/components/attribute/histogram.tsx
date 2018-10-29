import React from 'react';

export default class AttributeHistogramComponent extends React.Component {
  props;
  state;
  constructor(props: any) {
    super(props);
  }

  render() {
    const data = this.props.data;
    console.log(data);
    return (
      <div className="panelfilter-wrapper panel-component">
        {data.column.label}
      </div>
    );
  }
}
