const SET_PROMPT = 'SET_PROMPT';

export const setPrompt = (prompt) => {
  return {
    type: SET_PROMPT,
    prompt,
  };
};

export default function promptReducer(state = {}, action) {
  switch (action.type) {
    case SET_PROMPT:
      return action.prompt;
    default:
      return state;
  }
}
