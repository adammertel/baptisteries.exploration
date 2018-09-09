import React from 'react'
import { observer } from 'mobx-react'
import TimeBarComponent from './../components/timebar'

type Props = {
  stores: Array<Object>
}

class PanelContainer extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  timeBars(h) {
    const minDate = 200
    const maxDate = 1500

    const oneYearH = h / (maxDate - minDate)
    const y = fMax => oneYearH * (maxDate - fMax)
    const fh = (fMin, fMax) => oneYearH * (fMax - fMin)

    return this.props.stores.app.features.map(feature => {
      const featureMin = feature.props.date_after
      const featureMax = feature.props.date_before

      return {
        y: y(featureMax),
        h: fh(featureMin, featureMax)
      }
    })
  }

  render() {
    const timeBarHeight = 300
    const timeBarWidth = 800

    const timeBars = this.timeBars(timeBarHeight)
    return (
      <div className="container panel-container">
        <TimeBarComponent
          y={50}
          x={50}
          height={timeBarHeight}
          width={timeBarWidth}
          features={timeBars}
        />
      </div>
    )
  }
}

export default observer(PanelContainer)
