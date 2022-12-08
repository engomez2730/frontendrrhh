import { LOAD_EMPLEADOS } from "../actions/types"

const cargarEMpleados = (state={},action) =>{
    switch(action.type){
        case LOAD_EMPLEADOS:
            return {...state, empleados:action.payload}
        default:
            return state
    }
}

export default cargarEMpleados