import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'
import splashRoutes from './splashRoutes'

const reactRoot = document.getElementById('app')

ReactDOM.render(
  <Router routes={splashRoutes} history={browserHistory} />,
  reactRoot
)
