import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Rules from './components/Rules';
import Game from './components/Game';
import Lobby from './components/Lobby';
import Prompt from './components/Prompt';

const Routes = (props) => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route path="/rules" component={Rules} /> */}
        <Route path="/game" component={Game} />
        {/* <Route path="/lobby" component={Lobby} />
        <Route path="/prompt" component={Prompt} /> */}
      </Switch>
    </div>
  );
};

export default Routes;
