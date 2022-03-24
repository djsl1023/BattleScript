const SET_ROOM = 'SET_ROOM';

export const setRoom = (room) => ({
  type: SET_ROOM,
  room,
});

export default function roomReducer(state = {}, action) {
  switch (action.type) {
    case SET_ROOM:
      return action.room;
    default:
      return state;
  }
}
