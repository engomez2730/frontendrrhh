import { EDITAR_USUARIO } from "../actions/types"

const cargarEMpleados = (state={},action) =>{
    switch(action.type){
        case EDITAR_USUARIO:
            return action.payload
        default:
            return state
    }
}

export default cargarEMpleados