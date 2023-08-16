import { STEPS_CREAR_EMPLEADO } from "../actions/types";

const SolicitanteSelecionado = (state = {}, action) => {
  switch (action.type) {
    case STEPS_CREAR_EMPLEADO:
      return { ...state, StepEmpleado: action.payload };
    default:
      return state;
  }
};

export default SolicitanteSelecionado;
