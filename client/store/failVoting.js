//REDUX STORE FOR CONNECTED USERS
const SET_FAILED_VOTES = 'SET_FAILED_VOTES';

export const setFailedVotes = (key, failedVotes) => ({
  type: SET_FAILED_VOTES,
  failedVotes,
  key,
});
export default function failedVotesReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAILED_VOTES:
      return { ...state, [action.key]: action.failedVotes };
    default:
      return state;
  }
}
