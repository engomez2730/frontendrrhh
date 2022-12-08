import { VACANTE_SOLICITANTE_SELEC } from "../actions/types";


const AvisoSelecionado = (state={},action) =>{
    switch(action.type){
        case VACANTE_SOLICITANTE_SELEC:
            return {...state,vacanteSolicitante:action.payload}
        default:
            return state
    }
}

export default AvisoSelecionado