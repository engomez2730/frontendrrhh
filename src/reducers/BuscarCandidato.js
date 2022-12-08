import { BUSCAR_CANDIDATO } from "../actions/types"

const BUSCAR_CANDIDATO_REDUCER = (state={},action) =>{
    switch(action.type){
        case BUSCAR_CANDIDATO:
            return {...state, buscarCandidato:action.payload}
        default:
            return state
    }
}

export default BUSCAR_CANDIDATO_REDUCER