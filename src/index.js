import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom'
import { loading } from './utilities'
import 'assets/css/material-dashboard-react.css?v=1.8.0'

// core components
const Admin = lazy(() => import('./layouts/Admin'))

const hist = createBrowserHistory()

ReactDOM.render(
  <HashRouter history={hist}>
    <Suspense fallback={loading()}>
      <Switch>
        <Route path="/admin" component={Admin} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Suspense>
  </HashRouter>,
  document.getElementById('root')
)
