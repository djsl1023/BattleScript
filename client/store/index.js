import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import roomReducer from './room';
import userReducer from './users';
import gameStatusReducer from './gameStatus';
import promptReducer from './prompt';
import auth from './auth';
import resultReducer from './result';

const reducer = combineReducers({
  room: roomReducer,
  users: userReducer,
  gameStatus: gameStatusReducer,
  prompt: promptReducer,
  result: resultReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from './auth';
