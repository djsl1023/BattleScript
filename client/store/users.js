//REDUX STORE FOR CONNECTED USERS
const ADD_USER = 'ADD_USER';
const REMOVE_USER = 'REMOVE_USER';
const UPDATE_USER = 'UPDATE_USER';

export const updateUser = ({ key, field, value }) => ({
  type: UPDATE_USER,
  key,
  field,
  value,
});

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
    case UPDATE_USER: {
      state[action.key][action.field] = action.value;
      return { ...state };
    }
    default:
      return state;
  }
}
