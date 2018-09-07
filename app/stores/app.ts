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
  get data(): Array<Object> {
    console.log(window['stores'].data.data)
    return window['stores'].data.data
  }

  @action
  load(): void {
    this._loaded.set(true)
  }
}
