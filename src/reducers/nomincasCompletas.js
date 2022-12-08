import { NOMINAS_COMPLETAS } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case NOMINAS_COMPLETAS:
            return {...state,nominasCompletas:action.payload}
        default:
            return state
    }
}

export default setTOken