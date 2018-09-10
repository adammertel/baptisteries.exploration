import {
  keys,
  observable,
  action,
  computed,
  extendObservable
} from 'mobx'

import Base from './../helpers/base'

interface INumber {
  isInteger: Function
}
declare var Number: INumber

export default class DataStore {
  _data
  constructor(data) {
    this._data = data.features
      // filter invalid structured features
      .filter(feature => {
        return (
          feature &&
          feature.properties &&
          feature.geometry &&
          feature.geometry.coordinates &&
          feature.geometry.coordinates.length === 2
        )
      })
      // filter features with invalid time span
      .filter(feature => {
        return (
          Number.isInteger(feature.properties.date_before) &&
          Number.isInteger(feature.properties.date_after) &&
          feature.properties.date_before >
            feature.properties.date_after
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
