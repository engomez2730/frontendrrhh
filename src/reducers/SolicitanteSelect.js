import { SOLICITANTE_SELEC } from "../actions/types";


const SolicitanteSelecionado = (state={},action) =>{
    switch(action.type){
        case SOLICITANTE_SELEC:
            return {...state,SolicitanteSelecionado:action.payload}
        default:
            return state
    }
}

export default SolicitanteSelecionado