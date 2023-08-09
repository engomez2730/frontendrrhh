import { GET_DEPARTAMENTOS } from "../actions/types";

const INITIAL_STATE = {
  Departamentos: null,
};

const Dimitidos = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_DEPARTAMENTOS:
      return { ...state, Departamentos: action.payload };
    default:
      return state;
  }
};

export default Dimitidos;
