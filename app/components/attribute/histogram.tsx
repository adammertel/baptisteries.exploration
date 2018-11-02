import React from 'react';
import { Stage, Layer, Text, Rect, Line, Circle } from 'react-konva';
import Colors from './../../helpers/colors';

export default class AttributeHistogramComponent extends React.Component {
  props;
  state;
  constructor(props: any) {
    super(props);
  }

  render() {
    const data = this.props.data;
    const sizes = {
      barW: 20,
      barG: 5,
      histH: 100,
      histML: 10,
      histMR: 10,
      histMT: 5,
    };

    const barHMax = sizes.histH - sizes.histMT;
    const maxOcc = data.column.bars[0].occ;
    const histH = occ => (occ / maxOcc) * barHMax;

    console.log(data);
    const stageW = (sizes.barW + sizes.barG) * data.column.bars.length;
    return (
      <div className="panel-component histograms">
        <strong>{data.column.label}</strong>
        <div className="histogram">
          <Stage width={stageW} height={sizes.histH}>
            <Layer>
              {data.column.bars.map((bar, bi) => {
                const h = histH(bar.occ);
                console.log(bar.occ, h);
                return (
                  <Rect
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
              {data.column.bars.map((bar, bi) => {
                console.log(bar.label);
                return (
                  <Text
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
