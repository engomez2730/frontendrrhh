import { GET_PERMISOS } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case GET_PERMISOS:
            return {...state,permisos:action.payload}
        default:
            return state
    }
}

export default setTOken