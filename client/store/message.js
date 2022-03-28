//REDUX STORE FOR CHAT
const ADD_MESSAGE = 'ADD_MESSAGE';

export const addMessage = (message) => ({
  type: ADD_MESSAGE,
  message,
});

export default function messageReducer(state = [], action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return { ...state.push(action.message) };
    default:
      return state;
  }
}
