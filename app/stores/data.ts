import {
  keys,
  observable,
  action,
  computed,
  extendObservable
} from 'mobx'

import Base from './../helpers/base'

export default class DataStore {
  _data
  constructor(data) {
    this._data = data.features || []
  }

  @computed
  get data(): Array<Object> {
    return this._data
  }
}
