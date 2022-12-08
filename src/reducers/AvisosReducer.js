import { GET_AVISOS } from "../actions/types"

const cargarEMpleados = (state={},action) =>{
    switch(action.type){
        case GET_AVISOS:
            return {...state, avisos:action.payload}
        default:
            return state
    }
}

export default cargarEMpleados