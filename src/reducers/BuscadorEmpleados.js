import { BUSCADOR_EMPLEADOS } from "../actions/types"

const BuscadorEmpleados = (state={},action) =>{
    switch(action.type){
        case BUSCADOR_EMPLEADOS:
            return {...state, buscadorEmpleados:action.payload}
        default:
            return state
    }
}

export default BuscadorEmpleados