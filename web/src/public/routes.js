import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
export default () => (
  <Router>
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
)
