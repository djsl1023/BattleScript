//REDUX STORE FOR CONNECTED USERS
const SET_QUESTION = 'SET_QUESTION';

export const setQuestion = (roundNumber) => ({
  type: SET_QUESTION,
  roundNumber,
});

export default function questionReducer(state = {}, action) {
  switch (action.type) {
    case SET_QUESTION:
      return action.question;
    default:
      return state;
  }
}
