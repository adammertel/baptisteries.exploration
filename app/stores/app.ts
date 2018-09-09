import {
  keys,
  observable,
  action,
  computed,
  extendObservable
} from 'mobx'

import Base from './../helpers/base'

export default class AppStore {
  _sortProp

  constructor() {
    this._sortProp = observable.box('date_after')
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
}
