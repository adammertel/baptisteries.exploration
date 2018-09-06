import React from 'react'
import { render } from 'react-dom'
import AppContainer from './containers/app'
import Base from './helpers/base'

require('./main.scss')

if (document.body) {
  document.body.innerHTML = ''
  render(
    <div>
      <AppContainer />
    </div>,
    document.body.appendChild(document.createElement('div'))
  )
}
