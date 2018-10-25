import {
  keys,
  observable,
  action,
  computed,
  extendObservable
} from 'mobx'

import Base from './../helpers/base'
import { featureProp } from './../helpers/feature'

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
      .map(feature => {
        return {
          props: feature.properties,
          geo: [
            feature.geometry.coordinates[1],
            feature.geometry.coordinates[0]
          ]
        }
      })
      // filter features with invalid time span
      .filter(feature => {
        const dateMin = featureProp(feature, 'dateMin')
        const dateMax = featureProp(feature, 'dateMax')

        return (
          Number.isInteger(dateMin) &&
          Number.isInteger(dateMax) &&
          dateMax > dateMin
        )
      })
  }

  @computed
  get features(): Array<Object> {
    return this._data
  }
}
