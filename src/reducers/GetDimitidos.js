import { GET_DIMITIDOS } from "../actions/types";


const Dimitidos = (state={},action) =>{
    switch(action.type){
        case GET_DIMITIDOS:
            return {...state,Dimitidos:action.payload}
        default:
            return state
    }
}

export default Dimitidos