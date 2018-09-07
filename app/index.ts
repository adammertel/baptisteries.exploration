import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/app'
import Base from './helpers/base'
import './main.scss'

import * as data from './../data/baptisteries.json'
import AppStore from './stores/app'
import DataStore from './stores/data'
import MapStore from './stores/map'

console.log(data)

window['stores'] = {
  app: new AppStore(),
  map: new MapStore(),
  data: new DataStore(data)
}

if (document.body) {
  document.body.innerHTML = ''

  ReactDOM.render(
    React.createElement(AppContainer, { stores: window['stores'] }),
    document.body.appendChild(document.createElement('div'))
  )
}
