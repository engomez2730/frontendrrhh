import { PUESTO_SELECT } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case PUESTO_SELECT:
            return {...state,puestoSelecionado:action.payload}
        default:
            return state
    }
}

export default setTOken