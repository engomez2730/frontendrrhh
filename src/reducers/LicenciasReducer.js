import { GET_LICENCIAS } from "../actions/types"

const isLoggedIn = (state={},action) =>{

    switch(action.type){
        case GET_LICENCIAS:
            return {licencias:action.payload}
        default:
            return state
    }
   

} 

export default isLoggedIn;