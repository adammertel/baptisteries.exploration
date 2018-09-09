import {
  keys,
  observable,
  action,
  computed,
  extendObservable,
  toJS
} from 'mobx'

import Base from './../helpers/base'
import Config from './../helpers/config'

export default class AppStore {
  _sortProp
  _dateSelection

  constructor() {
    this._sortProp = observable.box('date_after')
    this._dateSelection = observable.box([
      Config.dates.min,
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
    return window['stores'].data.features.sort(this.sortMethod)
  }

  @computed
  get sortMethod(): Function {
    return (a, b) =>
      a.props[this.sortProp] > b.props[this.sortProp] ? -1 : 1
  }

  @action
  changeMethod(newProp: string): void {
    this._sortProp.set(newProp)
  }

  @action
  changeMinDateSelection(newMinDate: number): void {
    const newDateSelection = this.dateSelection.slice()
    newDateSelection[0] = newMinDate
    this._sortProp.set(newDateSelection)
  }

  @action
  changeMaxDateSelection(newMaxDate: number): void {
    const newDateSelection = this.dateSelection.slice()
    newDateSelection[1] = newMaxDate
    this._sortProp.set(newDateSelection)
  }
}
