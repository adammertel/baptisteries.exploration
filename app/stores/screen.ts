import { observable, action, computed, toJS } from 'mobx'
import Base from './../helpers/base'

export default class ScreenStore {
  _width
  _height
  constructor() {
    this._width = observable.box(0)
    this._height = observable.box(0)

    this.getScreenSizes(null)
    window.addEventListener('resize', this.getScreenSizes.bind(this))
  }

  @computed
  get width(): Number {
    return toJS(this._width)
  }

  @computed
  get height(): Number {
    return toJS(this._height)
  }

  @action
  setScreenHeight(e: Event | null): void {
    this._height.set(Base.screenHeight())
  }

  @action
  setScreenWidth(e: Event | null): void {
    this._width.set(Base.screenWidth())
  }

  getScreenSizes(e: Event | null): void {
    this.setScreenHeight(e)
    this.setScreenWidth(e)
  }
}
