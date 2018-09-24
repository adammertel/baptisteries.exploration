import React from 'react'
import { observer } from 'mobx-react'
import TimeBarComponent from './../components/timebar'
import TimeSelectComponent from './../components/timeselect'
import TimeLegendComponent from './../components/timelegend'
import PanelFilterComponent from './../components/panelfilter'
import PanelSettingsComponent from './../components/panelsettings'
import Config from './../helpers/config'
import { featureProp, timeColor } from './../helpers/feature'
import Base from './../helpers/base'

type Props = {
  stores: Array<Object>
}

@observer
export default class PanelContainer extends React.Component<Props> {
  props
  positions
  _middleTM // margin of y for the middle components

  constructor(props: any) {
    super(props)
    this._middleTM = 20
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

  handleIncrementMin(by: number) {
    console.log('min', by)
    this.props.stores.app.incrementMinDateSelection(by)
  }

  handleIncrementMax(by: number) {
    console.log(by)
    this.props.stores.app.incrementMaxDateSelection(by)
  }

  calculatePositions(screenH, screenW) {
    const margins = 10
    const h = screenH / 2 - margins * 2
    const w = screenW - margins * 2

    const settingsHeight = 100
    const timelineHeight = 100

    const histogramWidth = 0
    const timeSelectWidth = 100
    const timeLegendWidth = 30
    const settingsWidth = 200
    const middleHeight = h - settingsHeight - timelineHeight

    return {
      settings: {
        h: settingsHeight,
        w: settingsWidth,
        x: w - settingsWidth,
        y: 0
      },
      filter: {
        h: settingsHeight,
        w: w - settingsWidth,
        x: 0,
        y: 0
      },
      historgram: {
        h: middleHeight,
        w: histogramWidth,
        x: 0,
        y: settingsHeight
      },
      timeSelect: {
        h: middleHeight,
        w: timeSelectWidth,
        x: histogramWidth,
        y: settingsHeight
      },
      timeLegend: {
        h: middleHeight,
        w: timeLegendWidth,
        x: histogramWidth + timeSelectWidth,
        y: settingsHeight
      },
      timeBars: {
        h: middleHeight,
        w: w - histogramWidth - timeSelectWidth - timeLegendWidth,
        x: histogramWidth + timeSelectWidth + timeLegendWidth,
        y: settingsHeight
      },
      timeline: {
        h: timelineHeight,
        w: w,
        x: 0,
        y: settingsHeight + middleHeight
      }
    }
  }

  timeBars(h) {
    const store = this.props.stores.app
    return store.features.map((feature, fi) => {
      const dateMin = featureProp(feature, 'dateMin')
      const dateMax = featureProp(feature, 'dateMax')
      const yMax = this.dateToY(h, dateMax)
      const yMin = this.dateToY(h, dateMin)
      const barH = yMin - yMax

      return {
        circle: dateMax - dateMin < Config.dates.barCircleTreshold,
        y: yMax,
        x: fi,
        h: barH,
        existence: feature.props.certainty_existence,
        fill: timeColor(feature.selection.temporal),
        spatial: feature.selection.spatial,
        attributional: feature.selection.attributional
      }
    })
  }

  timeTicks(h: number) {
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    return Base.intRangeArray(minDate - 1, maxDate + 1)
      .filter(i => !(i % 100))
      .map(i => ({
        y: this.dateToY(h, i),
        date: i
      }))
  }

  /* returns the y coordinate for the given date */
  dateToY(h: number, date: number) {
    const hm = h - 2 * this._middleTM
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    const oneYearPxs = hm / (maxDate - minDate)
    return Math.round(oneYearPxs * (maxDate - date)) + this._middleTM
  }

  /* returns the date for the given y */
  yToDate(h: number, y: number) {
    const hm = h - 2 * this._middleTM
    const minDate = Config.dates.min
    const maxDate = Config.dates.max
    const onePxYears = (maxDate - minDate) / hm
    return maxDate - Math.round(onePxYears * (y - this._middleTM))
  }

  filterableColumns(): Array<Object> {
    return this.props.stores.filter.columns()
  }

  render() {
    const screenStore = this.props.stores.screen
    const appStore = this.props.stores.app
    const filterStore = this.props.stores.filter

    /*
    console.log(
      'spatial',
      appStore.features.filter(f => f.selection.spatial)
    )
    */

    const positions = (this.positions = this.calculatePositions(
      screenStore.height,
      screenStore.width
    ))

    const timeTicks = this.timeTicks(positions.timeSelect.h)
    const timeBars = this.timeBars(positions.timeBars.h)

    const selectedMaxDateY = this.dateToY(
      positions.timeSelect.h,
      appStore.dateSelection[1]
    )
    const selectedMinDateY = this.dateToY(
      positions.timeSelect.h,
      appStore.dateSelection[0]
    )

    return (
      <div className="container panel-container">
        <PanelSettingsComponent
          store={appStore}
          position={positions.settings}
        />
        <PanelFilterComponent
          columns={this.filterableColumns()}
          position={positions.filter}
          store={filterStore}
        />
        <hr
          className="panel-line"
          style={{ top: positions.settings.h }}
        />
        <TimeBarComponent
          position={positions.timeBars}
          bars={timeBars}
          ticks={timeTicks}
          margin={this._middleTM}
          selectedMinDateY={selectedMinDateY}
          selectedMaxDateY={selectedMaxDateY}
        />
        <TimeLegendComponent
          position={positions.timeLegend}
          margin={this._middleTM}
          ticks={timeTicks}
        />
        <TimeSelectComponent
          margin={this._middleTM}
          minDateY={this.dateToY(
            positions.timeSelect.h,
            Config.dates.min
          )}
          maxDateY={this.dateToY(
            positions.timeSelect.h,
            Config.dates.max
          )}
          selectedMinDateY={selectedMinDateY}
          selectedMaxDateY={selectedMaxDateY}
          minDate={appStore.dateSelection[0]}
          maxDate={appStore.dateSelection[1]}
          position={positions.timeSelect}
          onDragMin={this.handleTimeSelectDragMin.bind(this)}
          onDragMax={this.handleTimeSelectDragMax.bind(this)}
          incrementMin={this.handleIncrementMin.bind(this)}
          incrementMax={this.handleIncrementMax.bind(this)}
        />
      </div>
    )
  }
}
