import { observable, action, computed, toJS, set } from 'mobx'
import Base from './../helpers/base'

export default class MapStore {
  _center
  _zoom
  _extent
  dataStore
  constructor(dataStore) {
    this._center = observable.box([36.8, 10.1])
    this._zoom = observable.box(6)
    this._extent = observable.box([[10, 10], [20, 20]])
    this.dataStore = dataStore
  }

  @computed
  get extent(): Array<number> {
    return toJS(this._extent)
  }

  @computed
  get center(): Array<Number> {
    return toJS(this._center)
  }

  @computed
  get zoom(): Number {
    return this._zoom.get()
  }

  @action
  mapMoved(
    newCenter: Array<Number>,
    newZoom: Number,
    newExtent: Array<Number>
  ): void {
    this._center.set(newCenter)
    this._zoom.set(newZoom)
    this._extent.set(newExtent)
    window['stores'].selection.updateSpace(newExtent)
  }
}
