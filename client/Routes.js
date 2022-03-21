import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rules" component={Rules} />
      </Switch>
    </div>
  );
};

export default Routes;
