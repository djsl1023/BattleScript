//REDUX STORE FOR CONNECTED USERS
const SET_FAILED_VOTES = 'SET_FAILED_VOTES';

export const setFailedVotes = (failedVotes) => ({
  type: SET_FAILED_VOTES,
  failedVotes,
});

export default function failedVotesReducer(state = {}, action) {
  switch (action.type) {
    case SET_FAILED_VOTES:
      return action.failedVotes;

    default:
      return state;
  }
}
