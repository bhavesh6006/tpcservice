import React from 'react';
import Layout from './containers/Layout/Layout';
import Dashboard from './containers/Dashboard/Dashboard';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/">
            <Layout>
              <Dashboard />
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
