import { SET_USER } from "../actions/types";


const setTOken = (state={},action) =>{
    switch(action.type){
        case SET_USER:
            return {...state,user:action.payload}
        default:
            return state
    }
}

export default setTOken