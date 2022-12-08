import { VER_DEPARTAMENTO } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case VER_DEPARTAMENTO:
            return {...state,departamentoSelecionado:action.payload}
        default:
            return state
    }
}

export default setTOken