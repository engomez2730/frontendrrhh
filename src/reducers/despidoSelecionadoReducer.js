import { DESPIDO_SELECIONADO } from "../actions/types"


const isLoggedIn = (state={},action) =>{

    switch(action.type){
        case DESPIDO_SELECIONADO:
            return {despidoSelecionado:action.payload}
        default:
            return state
    }
   

} 

export default isLoggedIn;