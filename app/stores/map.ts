import { observable, action, computed, toJS } from 'mobx'
import Base from './../helpers/base'

export default class MapStore {
  _center
  _zoom
  constructor() {
    this._center = observable.box([40, 15])
    this._zoom = observable.box(4)
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
  mapMoved(newCenter: Array<Number>, newZoom: Number): void {
    this._center.set(newCenter)
    this._zoom.set(newZoom)
  }
}