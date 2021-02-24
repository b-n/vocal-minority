import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'

import {
  Home,
  Login,
  AuthCallback,
  Rate,
} from './pages'
import {
  APIProvider,
  AllocationProvider,
} from './stores'

const App: React.FC = () => {
  return (
    <APIProvider>
      <AllocationProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/rate">
              <Rate />
            </Route>
            <Route path="/auth/callback">
              <AuthCallback />
            </Route>
          </Switch>
        </Router>
      </AllocationProvider>
    </APIProvider>
  )
}

export default App
