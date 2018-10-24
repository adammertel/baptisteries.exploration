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
  _dataStore
  timeBarOrdering

  constructor(dataStore) {
    this._dataStore = dataStore

    this._dateSelection = observable.box([
      550, //Config.dates.min,
      Config.dates.max
    ])

    this.timeBarOrdering = [
      {
        id: 'time_certainty',
        label: 'time certainty',
        fn: (f1, f2) => {
          return f1.selection['temporal'] > f2.selection['temporal']
            ? 1
            : -1
        }
      },
      {
        id: 'after',
        label: 'ante quem',
        fn: (f1, f2) => {
          return f1.props['date_after'] > f2.props['date_after']
            ? 1
            : -1
        }
      },
      {
        id: 'before',
        label: 'post quem',
        fn: (f1, f2) => {
          return f1.props['date_before'] > f2.props['date_before']
        }
      }
    ]
    this._sortProp = observable.box(this.timeBarOrdering[0])
  }

  @computed
  get dateSelection(): Array<number> {
    return toJS(this._dateSelection).slice()
  }

  @computed
  get sortProp() {
    return this._sortProp.get()
  }

  @action
  changeSortProp(id: string): void {
    const sortAtt = this.timeBarOrdering.find(att => att.id === id)
    sortAtt && this._sortProp.set(sortAtt)
  }

  @computed
  get features(): Array<Object> {
    const extent = window['stores'].map.extent
    const filters = window['stores'].filter.filters
    const filterMode = window['stores'].filter.mode

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

    // displayed / hide / highlight
    const attributtionalSelectionMode = feature => {
      if (filters.length === 0) {
        return 'display'
      } else {
        const inFilters = filters.every(filter => {
          const fValue = feature.props[filter.column.id]
          return filter.values.includes(fValue)
        })

        if (inFilters) {
          return filterMode === 'display'
            ? 'displayed'
            : 'highlighted'
        } else {
          return filterMode === 'display' ? 'hidden' : 'displayed'
        }
      }
    }

    const features = window['stores'].data.features
      .map(feature => {
        feature.selection = {
          temporal: temporalCertainty(feature),
          attributional: attributtionalSelectionMode(feature),
          spatial: Base.pointInBounds(feature.geo, extent)
        }
        return feature
      })
      .sort(this.sortMethod)

    return features.filter(
      f => f.selection.attributional !== 'hidden'
    )
  }

  @computed
  get sortMethod(): Function {
    return (a, b) => {
      let aRank = a.selection.spatial ? 100 : -100
      let bRank = b.selection.spatial ? 100 : -100

      aRank += this.sortProp.fn(a, b)
      return aRank > bRank ? -1 : 1
    }
  }

  @action
  changeMinDateSelection(newMinDate: number): void {
    const newDateSelection = this.dateSelection
    newDateSelection[0] = newMinDate
    this._dateSelection.set(
      this.validateTimeSelection(newDateSelection)
    )
  }

  @action
  incrementMinDateSelection(by: number): void {
    const dateSelection = this.dateSelection
    dateSelection[0] = dateSelection[0] + by
    this._dateSelection.set(this.validateTimeSelection(dateSelection))
  }

  @action
  changeDateByClick(newDate: number): void {
    const newDateSelection = this.dateSelection
    const minDiff = Math.abs(newDateSelection[0] - newDate)
    const maxDiff = Math.abs(newDateSelection[1] - newDate)

    if (minDiff < maxDiff) {
      newDateSelection[0] = newDate
    } else {
      newDateSelection[1] = newDate
    }
    this._dateSelection.set(newDateSelection)
  }

  validateTimeSelection(timeSelection): Array<number> {
    const validatedTimeSelection = timeSelection.slice()
    validatedTimeSelection[0] = Base.clamp(
      validatedTimeSelection[0],
      Config.dates.min,
      validatedTimeSelection[1] - 1
    )
    validatedTimeSelection[1] = Base.clamp(
      validatedTimeSelection[1],
      validatedTimeSelection[0] + 1,
      Config.dates.max
    )
    return validatedTimeSelection
  }
}
