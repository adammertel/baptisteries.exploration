import React from 'react'
import { observer } from 'mobx-react'
import Base from './../helpers/base'
import Colors from './../helpers/colors'

type Props = {
  position: Object
}

export default class WelcomeModal extends React.Component<Props> {
  props
  state
  setState

  constructor(props: any) {
    super(props)
    this.state = {
      open: true
    }
  }

  handleHideModal() {
    this.setState({ open: false })
  }

  render() {
    const classes =
      'modal is-primary ' + (this.state.open ? 'is-active' : '')
    return (
      <div className={classes}>
        <div className="modal-background" />
        <div className="modal-content">
          <div className="card is-primary">
            <header className="card-header">
              <p className="card-header-title">
                Baptisteries - exploration tool
              </p>
            </header>
            <div className="card-content">
              <div className="content">
                Random app welcome text
                <p>
                  {' '}
                  we have <a href="#">manual</a>{' '}
                </p>
                <p>
                  {' '}
                  and here is the code <a href="#">github</a>{' '}
                </p>
              </div>
            </div>
            <footer className="card-footer">
              <a
                href="#"
                className="card-footer-item"
                onClick={this.handleHideModal.bind(this)}
              >
                Continue
              </a>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}
