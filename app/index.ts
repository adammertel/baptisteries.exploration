import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/app';
import Base from './helpers/base';
require('./main.scss');

const data = require('./../data/baptisteries.json');

if (document.body) {
  document.body.innerHTML = '';

  ReactDOM.render(
    React.createElement(AppContainer),
    document.body.appendChild(document.createElement('div'))
  );
}
