import { GET_PUESTOS } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case GET_PUESTOS:
            return {...state,puestos:action.payload}
        default:
            return state
    }
}

export default setTOken