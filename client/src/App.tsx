import React from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import { Home, Login, AuthCallback } from './pages'
import { Layout } from './pages/common'

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/auth/callback">
            <AuthCallback />
          </Route>
        </Switch>
      </Layout>
    </Router>
  )
}

export default App
