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
import { histogram, scaleLinear } from 'd3';

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
        domain: 'quality',
        values: [],
      },
      {
        id: 'shape',
        label: 'building shape',
        domain: 'quality',
        values: [],
      },
      {
        id: 'piscina_depth',
        label: 'piscina depth',
        domain: 'quantity',
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
    const maxNumberOfIntervals = 10;

    this._columns.forEach(column => {
      let bars = [];
      if (column.domain === 'quality') {
        // quality
        const freqs = [];

        this._dataStore.features.forEach(f => {
          const value = f.props[column.id];
          const freq = freqs.find(freq => freq.check(value));

          if (freq) {
            freq.occ = freq.occ + 1;
          } else {
            freqs.push({
              label: value,
              check: x => x === value,
              occ: 0,
            });
          }
        });

        const freqsSorted = freqs.sort((a, b) => (a.occ > b.occ ? -1 : 1));

        const others = { label: 'others', occ: 0 };
        freqsSorted.forEach((f, fi) => {
          if (fi < maxNumberOfIntervals - 1) {
            bars.push(f);
          } else {
            others.occ += f.occ;
          }
        });

        const mentionedValues = bars.map(f => f.label);
        others['check'] = x => {
          return !mentionedValues.includes(x);
        };

        if (others.occ > 0) {
          bars.push(others);
        }
      } else if (column.domain === 'quantity') {
        // quantity
        const values = this._dataStore.features.map(f => f.props[column.id]);
        var hist = histogram().thresholds(maxNumberOfIntervals);

        bars = hist(values).map(bar => {
          return {
            label: bar.x0 + ' - ' + bar.x1,
            check: x => x > bar.x0 && x <= bar.x1,
            occ: bar.length - 2,
          };
        });
      }

      column.bars = bars;
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
