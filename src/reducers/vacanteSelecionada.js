import { GET_VACANTE_SELECIONADA } from "../actions/types";


const AvisoSelecionado = (state={},action) =>{
    switch(action.type){
        case GET_VACANTE_SELECIONADA:
            return {...state,vacanteSelecionada:action.payload}
        default:
            return state
    }
}

export default AvisoSelecionado