import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import Lobby from './components/Lobby';

const Routes = (props) => {
  props.client
    .joinOrCreate('game', {})
    .then((room) => {
      console.log('joined successfully', room);
    })
    .catch((e) => {
      console.error('join error', e);
    });
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/rules" component={Rules} />
        <Route path="/lobby" component={Lobby} />
      </Switch>
    </div>
  );
};

export default Routes;
