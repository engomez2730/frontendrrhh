import { VER_EMPLEADO } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case VER_EMPLEADO:
            return {...state,usuarioSelecionadoVer:action.payload}
        default:
            return state
    }
}

export default setTOken