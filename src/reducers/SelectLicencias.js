import { SELECT_LICENCIAS } from "../actions/types"

const isLoggedIn = (state={},action) =>{

    switch(action.type){
        case SELECT_LICENCIAS:
            return {licenciaSelect:action.payload}
        default:
            return state
    }
} 

export default isLoggedIn;