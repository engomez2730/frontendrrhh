import { CARGAR_PROYECTOS } from "../actions/types";

const cargarEMpleados = (state = {}, action) => {
  switch (action.type) {
    case CARGAR_PROYECTOS:
      return { ...state, proyectos: action.payload };
    default:
      return state;
  }
};

export default cargarEMpleados;
