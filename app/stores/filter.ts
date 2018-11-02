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

    var newId = 0;
    const newBar = (label, checkFn) => {
      newId = newId + 1;
      return {
        label: label,
        check: checkFn,
        occ: 0,
        active: true,
        id: newId,
      };
    };
    this._columns.forEach(column => {
      let bars = [];
      if (column.domain === 'quality') {
        // quality
        const barsAll = [];

        this._dataStore.features.forEach(f => {
          const value = f.props[column.id];
          const bar = barsAll.find(bar => bar.check(value));

          if (bar) {
            bar.occ = bar.occ + 1;
          } else {
            barsAll.push(newBar(value, x => x === value));
          }
        });

        const barsSorted = barsAll.sort((a, b) => (a.occ > b.occ ? -1 : 1));

        const others = newBar('others', () => true);
        barsSorted.forEach((f, fi) => {
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

        bars = hist(values).map(interval => {
          const bar = newBar(
            interval.x0 + ' - ' + interval.x1,
            x => x > interval.x0 && x <= interval.x1,
          );
          bar.occ = interval.length - 2;
          return bar;
        });
      }

      column.bars = bars;
    });

    console.log(this._columns);
  }

  @action
  toggleBar = (column, barLabel) => {};
}
