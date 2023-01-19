import { combineReducers } from "redux";
import isLoggedIn from './isLoggedInReducer'
import setUser from "./setUserReducer";
import Empleados from './EmpleadosReducer'
import usuarioVer from './VerEmpleadoReducer'
import cambiarSteps from './cambiarSteps'
import usuarioEditadoFinal from './editarUsuarioReducer'
import VerDepartamento from "./verDepartamento";
import cambiarState from "./cambiarEstadoReducer";
import PermisosReducer from './PermisosReducer'
import permisoSelecioando from './permisoSelecioando'
import AvisoSelecionado from "./AvisoSelecionado";
import AvisosReducer from "./AvisosReducer";
import Vacantes from "./VacantesReducer";
import VacanteSelecionada from "./vacanteSelecionada";
import VacanteSolicitante from './VacanteSolicitante'
import SolicitanteSelect from './SolicitanteSelect'
import Entrevistados from "./EntrevistadosReduc";
import BUSCAR_CANDIDATO_REDUCER from "./BuscarCandidato";
import BUSCAR_SOLICITANTE_REDUCER from "./BuscarSolicitante";
import CandidatoSelect from './EntrevistadoSelecionado'
import Despidos from './DespidosReducer'
import despidoSelecionado from './despidoSelecionadoReducer'
import NominasCompletas from './nomincasCompletas'
import NominaCompletaSelect from './NominaCompletaSelect'
import NominaSelected from './Nomina_Selected'
import PuestosReducer from './PuestosReducer'
import Epp from './Get_Epps'
import PuestoSelecionado from './PuestoSelect'
import NominaSelecionadaVer from './NominaSelecionadaVer'
import BuscadorEmpleados from './BuscadorEmpleados'
import GetDimitidos from './GetDimitidos'


export default combineReducers({
    user:setUser,
    isLoggedIn: isLoggedIn,
    empleados:Empleados,
    usuarioSelecionadoVer:usuarioVer,
    usuarioEditarSelecionado:cambiarSteps,
    usuarioEditadoFinal:usuarioEditadoFinal,
    departamentoSelecionado: VerDepartamento,
    cambiarState:cambiarState,
    permisos:PermisosReducer,
    permisoSelecionado:permisoSelecioando,
    AvisoSelecionado:AvisoSelecionado,
    avisos:AvisosReducer,
    Vacantes:Vacantes,
    VacanteSelecionada:VacanteSelecionada,
    VacanteSolicitante: VacanteSolicitante,
    SolicitanseSelecionado: SolicitanteSelect,
    entrevistados: Entrevistados,
    buscarCandidato: BUSCAR_CANDIDATO_REDUCER,
    buscarSolicitante: BUSCAR_SOLICITANTE_REDUCER,
    candidatoSelecionado:CandidatoSelect,
    Despidos:Despidos,
    despidoSelecionado:despidoSelecionado,
    nominasCompletas:NominasCompletas,
    nominaCompletaSelect:NominaCompletaSelect,
    nominaSelecionada:NominaSelected,
    epps:Epp,
    puestos: PuestosReducer,
    puestoSelecionado:PuestoSelecionado,
    NominaSelecionadaVer:NominaSelecionadaVer,
    BuscadorEmpleados:BuscadorEmpleados,
    Dimitidos:GetDimitidos
})