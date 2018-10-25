import React from 'react'
import ReactDOM from 'react-dom'
import AppContainer from './containers/app'
import Base from './helpers/base'

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
import FilterStore from './stores/filter'
import SelectionStore from './stores/selection'

console.log(data)
const dataStore = new DataStore(data)

var stores = (window['stores'] = {
  app: new AppStore(dataStore),
  selection: new SelectionStore(dataStore),
  filter: new FilterStore(dataStore),
  map: new MapStore(dataStore),
  data: dataStore,
  screen: new ScreenStore()
})

if (document.body) {
  document.body.innerHTML = ''

  stores.screen.getScreenSizes()
  ReactDOM.render(
    React.createElement(AppContainer, {
      stores: stores
    }),
    document.body.appendChild(document.createElement('div'))
  )
}
