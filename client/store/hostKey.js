//REDUX STORE FOR CONNECTED USERS
const SET_HOSTKEY = 'SET_HOSTKEY';

export const setHostKey = (status) => ({
  type: SET_HOSTKEY,
  status,
});

export default function hostKeyReducer(state = '', action) {
  switch (action.type) {
    case SET_HOSTKEY:
      return action.status;
    default:
      return state;
  }
}
