import React from 'react'
import { render } from 'react-dom'
import DevTools from 'mobx-react-devtools'
import App from './components/app'

document.body.innerHTML = ''

render(
  <div>
    {/*  {DEVELOPMENT && <DevTools />} */}
    <App />
  </div>,
  document.body.appendChild(document.createElement('div'))
)
