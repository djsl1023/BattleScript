const SET_RESULT = 'SET_RESULT';

export const setResult = (result) => ({
  type: SET_RESULT,
  result,
});

export default function resultReducer(state = {}, action) {
  switch (action.type) {
    case SET_RESULT:
      return action.result;
    default:
      return state;
  }
}
