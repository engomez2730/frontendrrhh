import { CARGAR_EQUIPOS } from "../actions/types";

const Entrevistados = (state = {}, action) => {
  switch (action.type) {
    case CARGAR_EQUIPOS:
      return { ...state, equipos: action.payload };
    default:
      return state;
  }
};

export default Entrevistados;
