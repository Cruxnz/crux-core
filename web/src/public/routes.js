import React from 'react'
import { Route } from 'react-router'
// pages
import Home from './pages/Home'
import NotFound from './pages/NotFound'
export default (
  <Route>
    <Route path='/' component={Home} />
    <Route path='/*' component={NotFound} />
  </Route>
)
