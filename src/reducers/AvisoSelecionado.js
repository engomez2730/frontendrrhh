import { AVISO_SELECIOANDO } from "../actions/types";


const AvisoSelecionado = (state={},action) =>{
    switch(action.type){
        case AVISO_SELECIOANDO:
            return {...state,avisoSelecionado:action.payload}
        default:
            return state
    }
}

export default AvisoSelecionado