//REDUX STORE FOR CONNECTED USERS
const ADD_ANSWER = 'ADD_ANSWER';

export const addAnswer = (key, answer) => ({
  type: ADD_ANSWER,
  key,
  answer,
});

export default function answersReducer(state = {}, action) {
  switch (action.type) {
    case ADD_ANSWER:
      return { ...state, [action.key]: action.answer };

    default:
      return state;
  }
}
