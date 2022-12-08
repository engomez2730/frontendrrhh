import { GET_VACANTES } from "../actions/types"

const cargarEMpleados = (state={},action) =>{
    switch(action.type){
        case GET_VACANTES:
            return {...state, vacantes:action.payload}
        default:
            return state
    }
}

export default cargarEMpleados