import { ENTREVISTADOS_SELECIONADO } from "../actions/types";


const Entrevistados = (state={},action) =>{
    switch(action.type){
        case ENTREVISTADOS_SELECIONADO:
            return {...state,candidatoSelec:action.payload}
        default:
            return state
    }
}

export default Entrevistados