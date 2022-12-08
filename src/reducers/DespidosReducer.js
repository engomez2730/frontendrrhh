import { GET_DESPIDOS } from "../actions/types"


const isLoggedIn = (state={},action) =>{

    switch(action.type){
        case GET_DESPIDOS:
            return {despidos:action.payload}
        default:
            return state
    }
   

} 

export default isLoggedIn;