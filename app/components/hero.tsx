import React from 'react';
import { observer } from 'mobx-react';

class Hero extends React.Component {
  constructor(props) {
    super(props);
  }

  style() {
    return {};
  }

  render() {
    return (
      <nav className="navbar is-primary" id="hero">
        <div className="navbar-brand">
          <img src="./../src/assets/logo.png" />
        </div>

        <div id="" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <strong>Argo Explorer</strong> - Historical Data Exploration Tool
            </a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="field is-grouped">
                <p className="control">
                  <a className="button is-primary">
                    <span className="icon">
                      <i className="fa fa-user" />
                    </span>
                    <span>Login</span>
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default observer(Hero);
