//REDUX STORE FOR CONNECTED USERS
const SET_PASSED_VOTES = 'SET_PASSED_VOTES';

export const setPassedVotes = (passedVotes) => ({
  type: SET_PASSED_VOTES,
  passedVotes,
});

export default function passedVotesReducer(state = {}, action) {
  switch (action.type) {
    case SET_PASSED_VOTES:
      return action.passeddVotes;

    default:
      return state;
  }
}
