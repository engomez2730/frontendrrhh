import { EDITAR_USUARIO_FINAL } from "../actions/types"

const cargarEMpleados = (state={},action) =>{
    switch(action.type){
        case EDITAR_USUARIO_FINAL:
            return action.payload
        default:
            return state
    }
}

export default cargarEMpleados