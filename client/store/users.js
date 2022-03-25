//REDUX STORE FOR CONNECTED USERS
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';

export const addUser = (key, user) => ({
  type: ADD_USER,
  key,
  user,
});
export const removeUser = (users) => ({
  type: REMOVE_USER,
  users,
});

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, [action.key]: action.user };
    case REMOVE_USER: {
      return { ...action.users };
    }

    default:
      return state;
  }
}
