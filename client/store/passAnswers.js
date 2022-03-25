//REDUX STORE FOR CONNECTED USERS
const SET_PASSED_ANSWERS = 'SET_PASSED_ANSWERS';

export const setPassedAnswers = (passedAnswers) => ({
  type: SET_PASSED_ANSWERS,
  passedAnswers,
});

export default function passedAnswersReducer(state = {}, action) {
  switch (action.type) {
    case SET_PASSED_ANSWERS:
      return action.passedAnswers;

    default:
      return state;
  }
}
