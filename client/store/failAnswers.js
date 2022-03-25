//REDUX STORE FOR CONNECTED USERS
const SET_FAILED_ANSWER = 'SET_FAILED_ANSWER';

export const setFailedAnswers = (key, failedAnswer) => ({
  type: SET_FAILED_ANSWER,
  failedAnswer,
  key,
});

export default function failedAnswersReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAILED_ANSWER:
      return { ...state, [action.key]: action.failedAnswer };

    default:
      return state;
  }
}
