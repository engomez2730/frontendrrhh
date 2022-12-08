import { BUSCAR_SOLICITANTE } from "../actions/types"

const BUSCAR_SOLICITANTE_REDUCER = (state={},action) =>{
    switch(action.type){
        case BUSCAR_SOLICITANTE:
            return {...state, buscarSolicitante:action.payload}
        default:
            return state
    }
}

export default BUSCAR_SOLICITANTE_REDUCER