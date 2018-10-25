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
      open: false
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
                This app is designed as{' '}
                <a href="https://en.wikipedia.org/wiki/Exploratory_data_analysis">
                  ES(T)DA
                </a>{' '}
                tool for the exploration of the dataset of early
                Christian{' '}
                <a href="https://en.wikipedia.org/wiki/Baptistery">
                  Baptisteries
                </a>{' '}
                derived from printed catalogue of Ristow (Ristow S.
                Frühchristliche Baptisterien. 1998.)
                <ul>
                  <li>
                    a short{' '}
                    <a href="https://github.com/adammertel/baptisteries.exploration">
                      manual
                    </a>
                  </li>
                  <li>
                    code is located at the{' '}
                    <a href="https://github.com/adammertel/baptisteries.exploration#">
                      github repository
                    </a>{' '}
                  </li>
                </ul>
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
