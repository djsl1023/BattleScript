const ADD_PASSED_ANSWERS = 'ADD_PASSED_ANSWERS';

export const addPassedAnswers = (key, passedAnswers) => ({
  type: ADD_PASSED_ANSWERS,
  passedAnswers,
  key,
});

export default function passedAnswersReducer(state = {}, action) {
  switch (action.type) {
    case ADD_PASSED_ANSWERS:
      return { ...state, [action.key]: action.passedAnswers };

    default:
      return state;
  }
}
