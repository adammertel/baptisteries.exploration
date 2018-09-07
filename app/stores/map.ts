import { observable, action, computed } from 'mobx'
import Base from './../helpers/base'

export default class MapStore {
  _center
  _zoom
  constructor() {
    this._center = observable.box([0, 0])
    this._zoom = observable.box(6)
  }

  @computed
  get center(): Array<Number> {
    return this._center.get()
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
