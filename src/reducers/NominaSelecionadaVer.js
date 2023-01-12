import { NOMINA_SELECIONADA_VER_GET } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case NOMINA_SELECIONADA_VER_GET:
            return {...state,nominaSelecionadaVer:action.payload}
        default:
            return state
    }
}

export default setTOken