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
  _filterAttributes
  _dataStore
  _filters

  constructor(dataStore) {
    this._dataStore = dataStore
    this._filters = observable.box([])

    this._filterAttributes = [
      {
        id: 'ciborium',
        label: 'ciborium'
      },
      {
        id: 'piscina_shape',
        label: 'piscina shape'
      },
      {
        id: 'shape',
        label: 'building shape'
      }
    ]

    this.initFilters()
  }

  // initialise filters
  initFilters(): void {
    this._filterAttributes.forEach(attr => {
      attr.values = Base.unique(
        this._dataStore.features.map(f => f.props[attr.id])
      )
    })
  }
}
