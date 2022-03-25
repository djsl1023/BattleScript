//REDUX STORE FOR CONNECTED USERS
const SET_PASSED_VOTES = 'SET_PASSED_VOTES';

export const setPassedVotes = (key, passedVotes) => ({
  type: SET_PASSED_VOTES,
  passedVotes,
  key,
});

export default function passedVotesReducer(state = {}, action) {
  switch (action.type) {
    case SET_PASSED_VOTES:
      return { ...state, [action.key]: action.passedVotes };

    default:
      return state;
  }
}
