import { NOMINA_SELECTED } from "../actions/types"

const isLoggedIn = (state={},action) =>{

    switch(action.type){
        case NOMINA_SELECTED:
            return {nominaSelecionada:action.payload}
        default:
            return state
    }
   

} 

export default isLoggedIn;