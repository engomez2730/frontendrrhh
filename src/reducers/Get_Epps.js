import { GET_EPP } from "../actions/types";


const Epps = (state={},action) =>{
    switch(action.type){
        case GET_EPP:
            return {...state,epps:action.payload}
        default:
            return state
    }
}

export default Epps