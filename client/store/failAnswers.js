const ADD_FAILED_ANSWER = 'ADD_FAILED_ANSWER';

export const addFailedAnswers = (key, failedAnswer) => ({
  type: ADD_FAILED_ANSWER,
  failedAnswer,
  key,
});

export default function failedAnswersReducer(state = {}, action) {
  switch (action.type) {
    case ADD_FAILED_ANSWER:
      return { ...state, [action.key]: action.failedAnswer };

    default:
      return state;
  }
}
