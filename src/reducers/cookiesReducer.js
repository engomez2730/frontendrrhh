import { SET_COOKIES } from "../actions/types"

const INITIAL_STATE = {
    token:''
}
const isLoggedIn = (state=INITIAL_STATE,action) =>{

    switch(action.type){
        case SET_COOKIES:
            return {token:action.payload}
        default:
            return state
    }
   

} 

export default isLoggedIn;