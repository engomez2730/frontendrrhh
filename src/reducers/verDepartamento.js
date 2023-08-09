import { VER_DEPARTAMENTO } from "../actions/types";

const INITIAL_STATE = {
  departamentoSelecionado: null,
};

const setTOken = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case VER_DEPARTAMENTO:
      return { ...state, departamentoSelecionado: action.payload };
    default:
      return state;
  }
};

export default setTOken;
