import { ENTREVISTADOS } from "../actions/types";


const Entrevistados = (state={},action) =>{
    switch(action.type){
        case ENTREVISTADOS:
            return {...state,entrevistados:action.payload}
        default:
            return state
    }
}

export default Entrevistados