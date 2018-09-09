import React from 'react'
import { observer } from 'mobx-react'
import TimeBarComponent from './../components/timebar'
import TimeSelectComponent from './../components/timeselect'
import Config from './../helpers/config'

type Props = {
  stores: Array<Object>
}

class PanelContainer extends React.Component<Props> {
  props
  constructor(props: any) {
    super(props)
  }

  calculatePositions(screenH, screenW) {
    const margins = 10
    const h = screenH / 2 - margins * 2
    const w = screenW - margins * 2

    const optionHeight = 50
    const timelineHeight = 75

    const histogramWidth = 200
    const timeSelectWidth = 60

    const middleHeight = h - optionHeight - timelineHeight

    return {
      options: {
        h: optionHeight,
        w: w,
        x: 100,
        y: 0
      },
      historgram: {
        h: middleHeight,
        w: histogramWidth,
        x: 0,
        y: optionHeight
      },
      timeBars: {
        h: middleHeight,
        w: w - histogramWidth - timeSelectWidth,
        x: histogramWidth + timeSelectWidth,
        y: optionHeight
      },
      timeSelect: {
        h: middleHeight,
        w: timeSelectWidth,
        x: histogramWidth,
        y: optionHeight
      },
      timeline: {
        h: timelineHeight,
        w: w,
        x: 0,
        y: optionHeight + middleHeight
      }
    }
  }

  timeBars(h) {
    return this.props.stores.app.features.map(feature => {
      const yMax = this.dateHPosition(h, feature.props.date_before)
      const yMin = this.dateHPosition(h, feature.props.date_after)

      return {
        y: yMax,
        h: yMax - yMin
      }
    })
  }

  /* returns the height for the given date */
  dateHPosition(h: number, date: number) {
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    const oneYearH = h / (maxDate - minDate)
    return Math.round(oneYearH * (maxDate - date))
  }

  render() {
    const screenStore = this.props.stores.screen
    const appStore = this.props.stores.app
    const positions = this.calculatePositions(
      screenStore.height,
      screenStore.width
    )

    const timeBars = this.timeBars(positions.timeBars.h)

    return (
      <div className="container panel-container">
        <TimeBarComponent
          position={positions.timeBars}
          features={timeBars}
        />
        <TimeSelectComponent
          minDateY={this.dateHPosition(
            positions.timeSelect.h,
            appStore.dateSelection[0]
          )}
          maxDateY={this.dateHPosition(
            positions.timeSelect.h,
            appStore.dateSelection[1]
          )}
          position={positions.timeSelect}
        />
      </div>
    )
  }
}

export default observer(PanelContainer)
