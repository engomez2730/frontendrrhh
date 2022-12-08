import { PERMISO_SELECIOANDO } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case PERMISO_SELECIOANDO:
            return {...state,permisoSelecionado:action.payload}
        default:
            return state
    }
}

export default setTOken