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

  handleValueClicked(filter, value, e): void {
    this.props.store.toggleValue(value, filter.id)
  }

  handleRemoveFilter(filter): void {
    this.props.store.remove(filter.id)
  }

  handleModeChange(e): void {
    this.props.store.modeChange(e.target.value)
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
          height: position.h
        }}
      >
        <div className="first-line panel-top-component-line">
          <div className="heading">New Filter </div>
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
          <div className="heading">Display Mode </div>
          <div className="mode-filter">
            <div className="select is-small">
              <select
                value={this.props.store.mode}
                onChange={this.handleModeChange.bind(this)}
              >
                {this.props.store.modes.map(mode => {
                  return (
                    <option value={mode} key={mode}>
                      {mode}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="second-line panel-top-component-line">
          {this.props.store.filters.length !== 0 && (
            <div className="active-filters heading">
              Active Filters
            </div>
          )}

          {this.props.store.filters.map(filter => {
            const column = filter.column

            const dropClass =
              'dropdown is-up buttons has-addons ' +
              (this.state.open === filter.id ? 'is-active' : '')

            return (
              <div key={filter.id} className="filter-column">
                <div className={dropClass}>
                  <div className="dropdown-trigger">
                    <button
                      className="is-small button"
                      aria-haspopup="true"
                      aria-controls="dropdown-menu"
                      onClick={this.handleOpenDropdown.bind(
                        this,
                        filter.id
                      )}
                    >
                      <span>{column.label}</span>
                      <span className="icon is-small">
                        <i
                          className="fa fa-angle-down"
                          aria-hidden="true"
                        />
                      </span>
                    </button>
                    <span
                      onClick={this.handleRemoveFilter.bind(
                        this,
                        filter
                      )}
                      className="button is-small is-danger"
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
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
