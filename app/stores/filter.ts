import {
  keys,
  observable,
  action,
  computed,
  extendObservable,
  toJS,
} from 'mobx';

import Base from './../helpers/base';
import { featureProp } from './../helpers/feature';
import Config from './../helpers/config';

export default class AppStore {
  _columns;
  _dataStore;
  _filters;
  _newId;
  _mode;
  modes;

  constructor(dataStore) {
    this._newId = 0;

    this._mode = observable.box('highlight');
    this.modes = ['highlight', 'display'];

    this._dataStore = dataStore;
    this._filters = observable.box([]);

    this._columns = [
      {
        id: 'piscina_shape',
        label: 'piscina shape',
        values: [],
      },
      {
        id: 'shape',
        label: 'building shape',
        values: [],
      },
      {
        id: 'piscina_depth',
        label: 'piscina depth',
        values: [],
      },
    ];

    this.initFilters();
  }

  @computed
  get mode() {
    return toJS(this._mode);
  }

  @action
  modeChange(newMode: string): void {
    this._mode.set(newMode);
  }

  @computed
  get filters() {
    return toJS(this._filters);
  }

  columns(): Array<Object> {
    return this._columns;
  }

  columnById(columnId): Object | false {
    return this._columns.find(c => c.id === columnId);
  }

  @computed
  get columnsNotUsed(): Array<Object> {
    const filters = this.filters;
    return this._columns.filter(c => !filters.find(f => f.column.id === c.id));
  }

  // initialise filters
  initFilters(): void {
    this._columns.forEach(column => {
      const freqs = [];

      this._dataStore.features.forEach(f => {
        const value = f.props[column.id];
        const freq = freqs.find(fr => fr.value === value);
        if (freq) {
          freq.occ = freq.occ + 1;
        } else {
          freqs.push({ value: value, occ: 0 });
        }
      });

      const maxNumberOfVals = 5;
      const freqsSorted = freqs.sort((a, b) => (a.occ > b.occ ? -1 : 1));

      const freqsClipped = [];
      const others = { value: 'others', occ: 0 };
      freqsSorted.forEach((f, fi) => {
        if (fi < maxNumberOfVals - 1) {
          freqsClipped.push(f);
        } else {
          others.occ += f.occ;
        }
      });
      freqsClipped.push(others);
      console.log(freqsClipped);
      column.values = freqsClipped;
    });

    console.log(this._columns);
  }

  @action
  addNew(columnId): number {
    this._newId = this._newId + 1;
    const newFilters = this.filters.slice();
    if (!newFilters.find(f => f.column.id === columnId)) {
      const column = this.columnById(columnId);
      if (column) {
        const newFilter = {
          id: this._newId,
          column: column,
          values: [], //column['values'].slice()
        };
        console.log('newFilter', newFilter);
        newFilters.push(newFilter);
        this._filters.set(newFilters);
      }
    }
    return this._newId;
  }

  @action
  remove(filterId): void {
    console.log('removing', filterId);
    const newFilters = this.filters.slice().filter(f => f.id !== filterId);

    if (this.filters.length !== newFilters) {
      this._filters.set(newFilters);
    }
  }

  @action
  addValue(value, id): void {
    const newFilters = this.filters.slice();
    const filter = newFilters.find(f => f.id === id);
    if (filter) {
      if (!filter.values.includes(value)) {
        filter.values.push(value);
      }
      this._filters.set(newFilters);
    }
  }

  @action
  toggleValue(value, id): void {
    const newFilters = this.filters.slice();
    const filter = newFilters.find(f => f.id === id);
    if (filter) {
      // removing value
      if (filter.values.includes(value)) {
        const index = filter.values.indexOf(value);
        if (index > -1) {
          filter.values.splice(index, 1);
        }
      }

      // adding value
      else {
        filter.values.push(value);
      }
      this._filters.set(newFilters);
    }
  }

  @action
  removeValue(value, id): void {
    const newFilters = this.filters.slice();
    const filter = newFilters.find(f => f.id === id);
    if (filter) {
      const index = filter.values.indexOf(value);
      if (index > -1) {
        filter.values.splice(index, 1);
        this._filters.set(newFilters);
      }
    }
  }
}
