import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './client';
import Users from './components/Users';

const App = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <h1>Welcome to your React app with GraphQL API!</h1>
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
