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

import { SelectionModel } from './../helpers/models'

export default class SelectionStore {
  _dataStore
  _stored
  _active

  constructor(dataStore) {
    this._dataStore = dataStore
    this._stored = observable.box([])
    this._active = observable.box({
      space: {},
      time: {},
      attributes: {}
    })
  }

  @computed
  get active(): SelectionModel {
    return toJS(this._active)
  }

  @computed
  get stored(): SelectionModel[] {
    return toJS(this._stored)
  }

  @action
  updateSpace(newExtent) {
    const newActive = this.active
    newActive.space = newExtent
  }

  @action
  addToStored(meta) {
    const newStored = Base.cloneArray(this.stored)
    newStored.push({ ...this.active, ...{ meta: meta } })
    this._stored.set(newStored)
  }
}
