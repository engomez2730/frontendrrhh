import { NOMINAS_COMPLETA_SELECIONADA } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case NOMINAS_COMPLETA_SELECIONADA:
            return {...state,nominaCompletaSelect:action.payload}
        default:
            return state
    }
}

export default setTOken