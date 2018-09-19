import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

type Props = {
  position: Object
  columns: Array<Object>
}

@observer
export default class PanelFilterComponent extends React.Component<
  Props
> {
  props
  state
  setState
  constructor(props: any) {
    super(props)
    this.state = {
      open: false
    }
  }

  handleNewFilterChange(e): void {
    const newColumn = e.target.value
    this.props.store.addNew(newColumn)
  }

  handleOpenDropdown(filterId): void {
    if (this.state.open === filterId) {
      this.setState({ open: false })
    } else {
      this.setState({ open: filterId })
    }
  }

  handleValueClicked(filter, value): void {
    this.props.store.toggleValue(value, filter.id)
  }

  render() {
    const position = this.props.position
    return (
      <div
        className="panelfilter-wrapper panel-component panel-top-component"
        style={{
          position: 'absolute',
          top: position.y,
          left: position.x,
          padding: 10
        }}
      >
        <div className="heading">Filters : </div>
        <div className="new-filter">
          <div className="select is-small">
            <select
              value={this.state.newFilterId}
              onChange={this.handleNewFilterChange.bind(this)}
            >
              <option>Select attribute to filter</option>
              {this.props.store.columnsNotUsed.map(column => {
                return (
                  <option value={column.id} key={column.id}>
                    {column.label}
                  </option>
                )
              })}
            </select>
          </div>
        </div>
        <div className="active-filters">Active Filters</div>
        {this.props.store.filters.map(filter => {
          const column = filter.column

          const dropClass =
            'dropdown is-up ' +
            (this.state.open === filter.id ? 'is-active' : '')

          return (
            <div key={filter.id}>
              <div className="filter-name">{filter.column.label}</div>
              <div
                className={dropClass}
                onClick={this.handleOpenDropdown.bind(
                  this,
                  filter.id
                )}
              >
                <div className="dropdown-trigger">
                  <button
                    className="is-small button"
                    aria-haspopup="true"
                    aria-controls="dropdown-menu"
                  >
                    <span>{column.label}</span>
                    <span className="icon is-small">
                      <i
                        className="fas fa-angle-down"
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                </div>
                <div
                  className="dropdown-menu dropdown-content"
                  id="dropdown-menu"
                  role="menu"
                >
                  {column.values.map(value => {
                    return (
                      <div key={value} className="">
                        <label className="checkbox">
                          <input
                            onChange={this.handleValueClicked.bind(
                              this,
                              filter,
                              value
                            )}
                            type="checkbox"
                            checked={filter.values.includes(value)}
                          />
                          {value}
                        </label>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }
}
