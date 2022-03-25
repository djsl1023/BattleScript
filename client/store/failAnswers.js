//REDUX STORE FOR CONNECTED USERS
const SET_FAILED_ANSWERS = 'SET_FAILED_ANSWERS';

export const setFailedAnswers = (failedAnswers) => ({
  type: SET_FAILED_ANSWERS,
  failedAnswers,
});

export default function failedAnswersReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAILED_ANSWERS:
      return action.failedAnswers;

    default:
      return state;
  }
}
