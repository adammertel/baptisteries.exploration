import React from 'react';
import { Stage, Layer, Group, Text, Rect, Line, Circle } from 'react-konva';
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

  _handleBarClick(bar) {
    this.props.handleToggleBar(this.props.column, bar);
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
      hl: 2,
    };

    const barHMax = sizes.histH - sizes.histMT;
    const maxOcc = Math.max.apply(null, column.bars.map(bar => bar.occ));
    const histH = occ => (occ / maxOcc) * barHMax;

    const stageW =
      (sizes.barW + sizes.barG) * column.bars.length +
      (sizes.histML + sizes.histMR);

    return (
      <div className="panel-component histograms">
        <strong>{column.label}</strong>
        <div className="histogram">
          <Stage width={stageW} height={sizes.histH}>
            <Layer>
              {column.bars.map((bar, bi) => {
                const h = histH(bar.occ);
                const hl = sizes.hl;
                return (
                  <Group
                    x={bi * (sizes.barW + sizes.barG) + sizes.histML}
                    y={sizes.histH - h}
                    key={bi}>
                    {bar.active && (
                      <Rect
                        onMouseOver={this._handleBarOver.bind(this, bar)}
                        onMouseOut={this.props.handleCancelInspect}
                        key="bar-hl"
                        offsetX={hl}
                        offsetY={hl}
                        height={histH(bar.occ) + 2 * hl}
                        width={sizes.barW + 2 * hl}
                        fill="black"
                      />
                    )}
                    <Rect
                      onMouseOver={this._handleBarOver.bind(this, bar)}
                      onMouseOut={this.props.handleCancelInspect}
                      onClick={this._handleBarClick.bind(this, bar)}
                      key="bar"
                      height={histH(bar.occ)}
                      width={sizes.barW}
                      fill={Colors.temporal}
                    />
                  </Group>
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
                    x={(bi + 0.5) * (sizes.barW + sizes.barG) + sizes.histML}
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
