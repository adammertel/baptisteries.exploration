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
    this._data = data.features
      .filter(feature => {
        return (
          feature &&
          feature.properties &&
          feature.geometry &&
          feature.geometry.coordinates &&
          feature.geometry.coordinates.length === 2
        )
      })
      .map(feature => {
        return {
          props: feature.properties,
          geo: [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          ]
        }
      })
  }

  @computed
  get features(): Array<Object> {
    return this._data
  }
}
