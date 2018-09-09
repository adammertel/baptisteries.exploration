import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/app'
import Base from './helpers/base'
import Config from './helpers/config'

/* loading styles */
import './main.scss'
import './../node_modules/leaflet/dist/leaflet.css'
import './../node_modules/leaflet.markercluster/dist/MarkerCluster.css'
import './../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css'

import * as data from './../data/baptisteries.json'
import AppStore from './stores/app'
import DataStore from './stores/data'
import MapStore from './stores/map'
import ScreenStore from './stores/screen'

console.log(data)

window['stores'] = {
  app: new AppStore(),
  map: new MapStore(),
  data: new DataStore(data),
  screen: new ScreenStore()
}

if (document.body) {
  document.body.innerHTML = ''

  ReactDOM.render(
    React.createElement(AppContainer, { stores: window['stores'] }),
    document.body.appendChild(document.createElement('div'))
  )
}
