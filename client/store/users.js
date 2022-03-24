//REDUX STORE FOR CONNECTED USERS
const ADD_USER = 'ADD_USER';

export const addUser = (key, user) => ({
  type: ADD_USER,
  key,
  user,
});

export default function userReducer(state = {}, action) {
  switch (action.type) {
    case ADD_USER:
      return { ...state, [action.key]: action.user };
    default:
      return state;
  }
}
