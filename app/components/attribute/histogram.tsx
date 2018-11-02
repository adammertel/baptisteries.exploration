import React from 'react';
import { Stage, Layer, Text, Rect, Line, Circle } from 'react-konva';
import Colors from './../../helpers/colors';

export default class AttributeHistogramComponent extends React.Component {
  props;
  state;
  constructor(props: any) {
    super(props);
  }

  _handleBarOver(bar) {
    this.props.handleInspectMarkers(this.props.column, bar);
  }

  render() {
    const column = this.props.column;
    const sizes = {
      barW: 20,
      barG: 5,
      histH: 100,
      histML: 10,
      histMR: 10,
      histMT: 5,
    };

    const barHMax = sizes.histH - sizes.histMT;
    const maxOcc = Math.max.apply(null, column.bars.map(bar => bar.occ));
    const histH = occ => (occ / maxOcc) * barHMax;

    const stageW = (sizes.barW + sizes.barG) * column.bars.length;

    return (
      <div className="panel-component histograms">
        <strong>{column.label}</strong>
        <div className="histogram">
          <Stage width={stageW} height={sizes.histH}>
            <Layer>
              {column.bars.map((bar, bi) => {
                const h = histH(bar.occ);
                return (
                  <Rect
                    onMouseOver={this._handleBarOver.bind(this, bar)}
                    onMouseOut={this.props.handleCancelInspect}
                    key={bi}
                    height={histH(bar.occ)}
                    width={sizes.barW}
                    x={bi * (sizes.barW + sizes.barG)}
                    y={sizes.histH - h}
                    fill={Colors.temporal}
                  />
                );
              })}
            </Layer>
          </Stage>
          <Stage width={stageW} height={100}>
            <Layer>
              {column.bars.map((bar, bi) => {
                return (
                  <Text
                    onMouseOver={this._handleBarOver.bind(this, bar)}
                    onMouseOut={this.props.handleCancelInspect}
                    key={bi}
                    className="label"
                    rotation={90}
                    x={(bi + 0.5) * (sizes.barW + sizes.barG)}
                    text={bar.label}
                    y={5}
                  />
                );
              })}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
