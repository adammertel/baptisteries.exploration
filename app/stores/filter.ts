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
  _columns
  _dataStore
  _filters
  _newId

  constructor(dataStore) {
    this._newId = 0
    this._dataStore = dataStore
    this._filters = observable.box([])

    this._columns = [
      {
        id: 'piscina_shape',
        label: 'piscina shape',
        values: []
      },
      {
        id: 'shape',
        label: 'building shape',
        values: []
      }
    ]

    this.initFilters()
  }

  @computed
  get filters() {
    return toJS(this._filters)
  }

  columns(): Array<Object> {
    return this._columns
  }

  columnById(columnId): Object | false {
    return this._columns.find(c => c.id === columnId)
  }

  @computed
  get columnsNotUsed(): Array<Object> {
    const filters = this.filters
    return this._columns.filter(
      c => !filters.find(f => f.column.id === c.id)
    )
  }

  // initialise filters
  initFilters(): void {
    this._columns.forEach(column => {
      column.values = Base.unique(
        this._dataStore.features.map(f => f.props[column.id])
      )
      column.frequencies = column.values.map(value => {
        return this._dataStore.features.filter(
          f => f.props[column.id] === value
        ).length
      })
    })

    console.log(this._columns)
  }

  @action
  addNew(columnId): number {
    this._newId = this._newId + 1
    const newFilters = this.filters.slice()
    if (!newFilters.find(f => f.column.id === columnId)) {
      const column = this.columnById(columnId)
      if (column) {
        const newFilter = {
          id: this._newId,
          column: column,
          values: [] //column['values'].slice()
        }
        console.log('newFilter', newFilter)
        newFilters.push(newFilter)
        this._filters.set(newFilters)
      }
    }
    return this._newId
  }

  @action
  remove(filterId): void {
    console.log('removing', filterId)
    const newFilters = this.filters
      .slice()
      .filter(f => f.id !== filterId)

    if (this.filters.length !== newFilters) {
      this._filters.set(newFilters)
    }
  }

  @action
  addValue(value, id): void {
    const newFilters = this.filters.slice()
    const filter = newFilters.find(f => f.id === id)
    if (filter) {
      if (!filter.values.includes(value)) {
        filter.values.push(value)
      }
      this._filters.set(newFilters)
    }
  }

  @action
  toggleValue(value, id): void {
    const newFilters = this.filters.slice()
    const filter = newFilters.find(f => f.id === id)
    if (filter) {
      // removing value
      if (filter.values.includes(value)) {
        const index = filter.values.indexOf(value)
        if (index > -1) {
          filter.values.splice(index, 1)
        }
      }

      // adding value
      else {
        filter.values.push(value)
      }
      this._filters.set(newFilters)
    }
  }

  @action
  removeValue(value, id): void {
    const newFilters = this.filters.slice()
    const filter = newFilters.find(f => f.id === id)
    if (filter) {
      const index = filter.values.indexOf(value)
      if (index > -1) {
        filter.values.splice(index, 1)
        this._filters.set(newFilters)
      }
    }
  }
}
