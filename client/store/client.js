//REDUX STORE TO SAVE CLIENT INSTANCE SO IT CAN BE USED ACROSS
//COMPONENTS

const SET_CLIENT = 'SET_CLIENT';

export const setClient = (client) => ({
  type: SET_CLIENT,
  client,
});

export default function clientReducer(state = {}, action) {
  switch (action.type) {
    case SET_CLIENT:
      return action.client;
    default:
      return state;
  }
}
