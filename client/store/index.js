import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import roomReducer from './room';
import userReducer from './users';
import gameStatusReducer from './gameStatus';
import promptReducer from './prompt';
import questionReducer from './question';
import answersReducer from './failAnswers';
import failedAnswersReducer from './failAnswers';
import failedVotesReducer from './failVoting';
import passedAnswersReducer from './passAnswers';
import passedVotesReducer from './passVoting';
import auth from './auth';
import messageReducer from './message';
import timerReducer from './timer';
import hostKeyReducer from './hostKey';
const USER_LEAVE_ROOM = 'USER_LEAVE_ROOM';
export const userLeaveRoom = (action) => {
  return {
    type: USER_LEAVE_ROOM,
    action,
  };
};
const rootReducer = (state, action) => {
  switch (action.type) {
    case USER_LEAVE_ROOM:
      return reducer(undefined, action);
    default:
      return reducer(state, action);
  }
};
const reducer = combineReducers({
  room: roomReducer,
  users: userReducer,
  gameStatus: gameStatusReducer,
  message: messageReducer,
  prompt: promptReducer,
  question: questionReducer,
  answer: answersReducer,
  failedAnswers: failedAnswersReducer,
  passedAnswers: passedAnswersReducer,
  failedVotes: failedVotesReducer,
  passedVotes: passedVotesReducer,
  timer: timerReducer,
  hostKey: hostKeyReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store;
export * from './auth';
