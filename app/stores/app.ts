import {
  keys,
  observable,
  action,
  computed,
  extendObservable,
  toJS
} from 'mobx'

import Base from './../helpers/base'
import { featureProp } from './../helpers/feature'
import Config from './../helpers/config'

export default class AppStore {
  _sortProp
  _dateSelection

  constructor() {
    this._sortProp = observable.box('date_after')
    this._dateSelection = observable.box([
      550, //Config.dates.min,
      Config.dates.max
    ])
  }

  @computed
  get dateSelection(): Array<number> {
    return toJS(this._dateSelection)
  }

  @computed
  get sortProp(): string {
    return this._sortProp.get()
  }

  @computed
  get features(): Array<Object> {
    const extent = window['stores'].map.extent

    const temporalCertainty = feature => {
      const dateMin = featureProp(feature, 'dateMin')
      const dateMax = featureProp(feature, 'dateMax')
      const duration = Base.intRangeArray(dateMin, dateMax)

      const selectedDuration = Base.intRangeArray(
        this.dateSelection[0],
        this.dateSelection[1]
      )
      const intersection = Base.arrayIntersection(
        duration,
        selectedDuration
      )
      const ratio = intersection.length / duration.length
      // console.log(intersection.length, duration.length, ratio)
      return ratio
    }

    return window['stores'].data.features
      .map(feature => {
        feature.selection = {
          temporal: temporalCertainty(feature),
          attributional: true,
          spatial: Base.pointInBounds(feature.geo, extent)
        }
        return feature
      })
      .sort(this.sortMethod)
  }

  @computed
  get sortMethod(): Function {
    return (a, b) => {
      let aRank = a.selection.spatial ? 100 : -100
      let bRank = b.selection.spatial ? 100 : -100

      aRank +=
        a.props[this.sortProp] > b.props[this.sortProp] ? 1 : -1
      return aRank > bRank ? -1 : 1
    }
  }

  @action
  changeMethod(newProp: string): void {
    this._sortProp.set(newProp)
  }

  @action
  changeMinDateSelection(newMinDate: number): void {
    const newDateSelection = this.dateSelection.slice()
    newDateSelection[0] = newMinDate
    this._dateSelection.set(newDateSelection)
  }

  @action
  changeMaxDateSelection(newMaxDate: number): void {
    const newDateSelection = this.dateSelection.slice()
    newDateSelection[1] = newMaxDate
    this._dateSelection.set(newDateSelection)
  }
}
