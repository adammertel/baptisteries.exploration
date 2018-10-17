import { observable, action, computed, toJS } from 'mobx'
import Base from './../helpers/base'
import Config from './../helpers/config'
import { SizeModel } from './../helpers/models'

export default class ScreenStore {
  _width
  _height
  _resizing

  constructor() {
    this._width = observable.box(0)
    this._height = observable.box(0)
    this._resizing = false

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

  @computed
  get _timePanelSizes(): SizeModel {
    return {
      width: this._mapTimeWidth + 'px',
      height: Config.panels.timeHeight + 'px',
      left: '0px',
      top: this._mapHeight + 'px'
    }
  }

  @computed
  get _attributePanelSizes(): SizeModel {
    return {
      width: Config.panels.attributeWidth + 'px',
      height: '100%',
      left: this._mapTimeWidth + 'px',
      top: '0px'
    }
  }

  @computed
  get _mapPanelSizes(): SizeModel {
    return {
      width: this._mapTimeWidth + 'px',
      height: this._mapHeight + 'px',
      left: '0px',
      top: '0px'
    }
  }

  @computed
  get _mapHeight(): Number {
    return Base.screenHeight() - Config.panels.timeHeight
  }

  @computed
  get _mapTimeWidth(): Number {
    return Base.screenWidth() - Config.panels.attributeWidth
  }

  getScreenSizes(e: Event | null): void {
    if (!this._resizing) {
      this._resizing = true
      setTimeout(() => {
        this.setScreenHeight(e)
        this.setScreenWidth(e)
        this._resizing = false
      }, 2000)
    }
  }
}
