import React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'
import AppContainer from './containers/app'
import Base from './helpers/base'

require('./main.scss')
document.body.innerHTML = ''

window['B'] = Base

render(
  <div>
    {/*  {DEVELOPMENT && <DevTools />} */}
    <AppContainer />
  </div>,
  document.body.appendChild(document.createElement('div'))
)
