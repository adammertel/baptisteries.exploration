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
  positions
  constructor(props: any) {
    super(props)
  }

  handleTimeSelectDragMin(e) {
    const newY = e.target.attrs.y
    const newDate = this.yToDate(this.positions.timeSelect.h, newY)
    this.props.stores.app.changeMinDateSelection(newDate)
  }

  handleTimeSelectDragMax(e) {
    const newY = e.target.attrs.y
    const newDate = this.yToDate(this.positions.timeSelect.h, newY)
    this.props.stores.app.changeMaxDateSelection(newDate)
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
      const yMax = this.dateToY(h, feature.props.date_before)
      const yMin = this.dateToY(h, feature.props.date_after)

      return {
        y: yMax,
        h: yMax - yMin
      }
    })
  }

  /* returns the y coordinate for the given date */
  dateToY(h: number, date: number) {
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    const oneYearPxs = h / (maxDate - minDate)
    return Math.round(oneYearPxs * (maxDate - date))
  }

  /* returns the date for the given y */
  yToDate(h: number, y: number) {
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    const onePxYears = (maxDate - minDate) / h
    return maxDate - Math.round(onePxYears * y)
  }

  render() {
    const screenStore = this.props.stores.screen
    const appStore = this.props.stores.app
    const positions = (this.positions = this.calculatePositions(
      screenStore.height,
      screenStore.width
    ))

    const timeBars = this.timeBars(positions.timeBars.h)

    return (
      <div className="container panel-container">
        <TimeBarComponent
          position={positions.timeBars}
          features={timeBars}
        />
        <TimeSelectComponent
          minDateY={this.dateToY(
            positions.timeSelect.h,
            appStore.dateSelection[0]
          )}
          maxDateY={this.dateToY(
            positions.timeSelect.h,
            appStore.dateSelection[1]
          )}
          position={positions.timeSelect}
          onDragMin={this.handleTimeSelectDragMin.bind(this)}
          onDragMax={this.handleTimeSelectDragMax.bind(this)}
        />
      </div>
    )
  }
}

export default observer(PanelContainer)
