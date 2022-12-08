import { LOG_USER_IN,LOG_USER_OUT } from "../actions/types"

const INITIAL_STATE = {
    isLoggedIn:false
}
const isLoggedIn = (state=INITIAL_STATE,action) =>{
    switch(action.type){
        case LOG_USER_IN:
            return {...state, isLoggedIn:true}
        case LOG_USER_OUT:
            return {...state, isLoggedIn:false}
        default:
            return state
    }
} 

export default isLoggedIn;