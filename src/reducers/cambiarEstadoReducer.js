import { CAMBIAR_STATE } from "../actions/types";
const state = {
  cambiarState: false,
};

const cambiarState = (state = false, action) => {
  switch (action.type) {
    case CAMBIAR_STATE:
      return action.payload;
    default:
      return state;
  }
};

export default cambiarState;
