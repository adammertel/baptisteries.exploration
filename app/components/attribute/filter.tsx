import React from 'react';
import { observer } from 'mobx-react';
import Base from './../../helpers/base';
import Colors from './../../helpers/colors';

@observer
export default class AttributeFilterComponent extends React.Component {
  props;
  state;
  setState;
  constructor(props: any) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleNewFilterChange(e): void {
    const newColumn = e.target.value;
    this.props.stores.filter.addNew(newColumn);
  }

  handleOpenDropdown(filterId): void {
    if (this.state.open === filterId) {
      this.setState({ open: false });
    } else {
      this.setState({ open: filterId });
    }
  }

  handleValueClicked(filter, value, e): void {
    this.props.stores.filter.toggleValue(value, filter.id);
  }

  handleRemoveFilter(filter): void {
    this.props.stores.filter.remove(filter.id);
  }

  handleModeChange(e): void {
    this.props.stores.filter.modeChange(e.target.value);
  }

  render() {
    const store = this.props.stores.filter;
    return (
      <div className="panelfilter-wrapper panel-component panel-top-component">
        <div className="first-line panel-top-component-line">
          <div className="heading">New Filter </div>
          <div className="new-filter">
            <div className="select is-small is-secondary">
              <select
                value={this.state.newFilterId}
                onChange={this.handleNewFilterChange.bind(this)}
              >
                <option>Select attribute to filter</option>
                {store.columnsNotUsed.map(column => {
                  return (
                    <option value={column.id} key={column.id}>
                      {column.label}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="second-line panel-top-component-line">
          {store.filters.length !== 0 && (
            <div className="active-filters heading">Active Filters</div>
          )}

          {store.filters.map(filter => {
            const column = filter.column;

            const dropClass =
              'dropdown is-up buttons has-addons ' +
              (this.state.open === filter.id ? 'is-active' : '');

            return (
              <div key={filter.id} className="filter-column">
                <div className={dropClass}>
                  <div className="dropdown-trigger">
                    <button
                      className="is-small button  is-secondary"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      onClick={this.handleOpenDropdown.bind(this, filter.id)}
                    >
                      <span>{column.label}</span>
                      <span className="icon is-small">
                        <i className="fa fa-angle-down" aria-hidden="true" />
                      </span>
                    </button>
                    <span
                      onClick={this.handleRemoveFilter.bind(this, filter)}
                      className="button is-small is-secondary"
                    >
                      <span className="icon is-small">
                        <i className="fas fa-trash-alt" />
                      </span>
                    </span>
                  </div>
                  <div
                    className="dropdown-menu dropdown-content"
                    id="dropdown-menu"
                    role="menu"
                  >
                    {column.values.map((value, vi) => {
                      return (
                        <div key={value} className="line">
                          <label
                            onClick={this.handleValueClicked.bind(
                              this,
                              filter,
                              value
                            )}
                            className="checkbox"
                          >
                            <input
                              type="checkbox"
                              checked={filter.values.includes(value)}
                            />
                            <span className="line-label">
                              {value} ({column.frequencies[vi]})
                            </span>
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
