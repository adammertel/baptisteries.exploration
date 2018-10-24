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

export default class SelectionStore {
  _dataStore
  _stored
  _active

  constructor(dataStore) {
    this._dataStore = dataStore
    this._stored = observable.box([])
    this._active = observable.box({})
  }

  @computed
  active() {
    return toJS(this._active)
  }

  @computed
  stored(): { space; time; attributes; meta }[] {
    return toJS(this._stored)
  }

  @action
  addToStored(meta) {
    const newStored = Base.cloneArray(this.stored)
    newStored.push({ ...this.active, ...{ meta: meta } })
    this._stored.set(newStored)
  }
}
