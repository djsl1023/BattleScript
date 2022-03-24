//REDUX STORE FOR CONNECTED USERS
const SET_GAME_STATUS = 'SET_GAME_STATUS';

export const setGameStatus = (status) => ({
  type: SET_GAME_STATUS,
  status,
});

export default function gameStatusReducer(state = '', action) {
  switch (action.type) {
    case SET_GAME_STATUS:
      return action.status;
    default:
      return state;
  }
}
