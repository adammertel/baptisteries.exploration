import {
  keys,
  observable,
  action,
  computed,
  extendObservable
} from 'mobx'

import Base from './../helpers/base'

export default class AppStore {
  _loaded
  constructor() {
    this._loaded = observable.box(false)
  }

  @computed
  get features(): Array<Object> {
    return window['stores'].data.features
  }

  @action
  load(): void {
    this._loaded.set(true)
  }
}
