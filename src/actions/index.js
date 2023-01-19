import {
    GET_PUESTOS,
    BUSCADOR_EMPLEADOS,
    NOMINA_SELECIONADA_VER_GET,
    PUESTO_SELECT,
    NOMINAS_COMPLETAS,
    GET_EPP,
    NOMINA_SELECTED,
    NOMINAS_COMPLETA_SELECIONADA,
    ENTREVISTADOS,
    DESPIDO_SELECIONADO,
    GET_DESPIDOS,
    ENTREVISTADOS_SELECIONADO,
    BUSCAR_CANDIDATO,
    BUSCAR_SOLICITANTE,
    SOLICITANTE_SELEC,
    VACANTE_SOLICITANTE_SELEC,
    GET_VACANTE_SELECIONADA, 
    LOG_USER_IN,GET_AVISOS,
    LOG_USER_OUT,
    AVISO_SELECIOANDO,
    SET_COOKIES,
    SET_USER,
    LOAD_EMPLEADOS,
    VER_EMPLEADO,
    PERMISO_SELECIOANDO,
    EDITAR_USUARIO,
    GET_PERMISOS,
    EDITAR_USUARIO_FINAL,
    VER_DEPARTAMENTO,
    CAMBIAR_STATE,
     GET_VACANTES,
     GET_DIMITIDOS
} from "./types"

import rrhhApi from "../apis/rrhhApi"

export const setUser = (User) =>{
    return {
        type:SET_USER,
        payload:User
    }
}


export const loggedUserIn = () =>{
    return {
        type:LOG_USER_IN,
    }
}

export const loggedUserOut = () =>{
    return {
        type:LOG_USER_OUT,
    }
}

export const setCookies = (token) =>{
    return {
        type:SET_COOKIES,
        payload:token
    }
}

export const cargarEmpleados = () => async (distpatch) =>{
    const response  = await rrhhApi.get('empleados/')
    distpatch({
        type:LOAD_EMPLEADOS,
        payload:response.data.empleados.Empleados
    })
}

export const empleadoSelecionadoVer = (id) => async (distpatch) =>{
    const response = await rrhhApi.get(`empleados/${id}`)
    distpatch({
        type:VER_EMPLEADO,
        payload:response.data.data.data
    })
}

export const usuarioEditarSeleciondo = (usuario) =>{
    return{
        type:EDITAR_USUARIO,
        payload:usuario
    }
}

export const editarUsuario = (values,key) => async (distpatch) =>{

    const data = await rrhhApi.patch(`empleados/${key}`,{
        salarioBruto:values.salario,
        contrato:values.contrato,
        departamento:values.departamento,
        expiracionDelContrato:values.vencimientoDelContrato,
        cedula:values.cedula,
        direccion:values.direccion,
        vacacionesTomadas:values.vacacionesTomadas,
        id:key
    })
    distpatch({
        type:EDITAR_USUARIO_FINAL,
        payload:data.data.data.data
    })
}

export const verDepartamento = (values) =>{
    return({
        type:VER_DEPARTAMENTO,
        payload:values
    })
}

export const CAMBIAR_ESTADO = (value) =>{
    return({
        type:CAMBIAR_STATE,
        payload:value
    })
}

export const GET_PERMISOS_STATE = () => async (distpatch) => {
    const data = await rrhhApi.get('/permisos')
    distpatch({
        type:GET_PERMISOS,
        payload:data.data.allPermisos
    })
}

export const permisoSelecionado = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/permisos/${dataKey.key}`)
    distpatch({
        type:PERMISO_SELECIOANDO,
        payload:data.data.permiso
    })
}

export const avisoSelecionado = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/anuncios/${dataKey.key}`)
    distpatch({
        type:AVISO_SELECIOANDO,
        payload:data.data.anuncio
    })
}

export const GET_AVISOS_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get('anuncios')
    distpatch({
        type:GET_AVISOS,
        payload:data.data.Anuncios
    })
}

export const GET_VACANTES_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get('vacantes')
    distpatch({
        type:GET_VACANTES,
        payload:data.data.data.Vacantes
    })
}

export const vacanteSelecionada = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/vacantes/${dataKey.key}`)
    distpatch({
        type:GET_VACANTE_SELECIONADA,
        payload:data.data.data.Vacantes
    })
}

export const VACANTE_SOLICITANTE = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/vacantes/${dataKey.key}`)

    distpatch({
        type:VACANTE_SOLICITANTE_SELEC,
        payload:data.data.data.Vacantes
    })
}

export const SOLICITANTE_SELECT = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/solicitantes/${dataKey.key}`)
    distpatch({
        type:SOLICITANTE_SELEC,
        payload:data.data.data.data
    })
}

export const GET_ENTREVISTADOS = () => async (distpatch) => {
    const data = await rrhhApi.get('entrevistados')
    distpatch({
        type:ENTREVISTADOS,
        payload:data.data.Entrevistados
    })
}

export const BUSCAR_CANDIDATO_ACTION = (candidato) => {
    
    return{
        type:BUSCAR_CANDIDATO,
        payload:candidato
    }
}
export const BUSCAR_SOLICITANTE_ACTION = (solicitante) => {
    
    return{
        type:BUSCAR_SOLICITANTE,
        payload:solicitante
    }
}


export const ENTREVISTADOS_SELECIONADO_ACTION = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/entrevistados/${dataKey.key}`)
    distpatch({
        type:ENTREVISTADOS_SELECIONADO,
        payload:data.data.data.data
    })
}

export const DESPIDO_SELECIONADO_ACTION = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/despidos/${dataKey}`)
    console.log(data)
    distpatch({
        type:DESPIDO_SELECIONADO,
        payload:data.data.despido
    })
}

export const GET_DESPIDOS_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get(`/despidos/`)
    distpatch({
        type:GET_DESPIDOS,
        payload:data.data.Despidos
    })
}

export const GET_NOMINASCOMPLETAS_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get(`nominacompleta`)
    distpatch({
        type:NOMINAS_COMPLETAS,
        payload:data.data.newNominaCompleta
    })
}

export const NOMINAS_COMPLETA_SELECIONADA_ACTION = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/nominacompleta/${dataKey}`)
    distpatch({
        type:NOMINAS_COMPLETA_SELECIONADA,
        payload:data.data.newNominaCompleta
    })
}



export const NOMINAS_SELECIONADA = (dataKey) => async (distpatch) => {
    distpatch({
        type:NOMINA_SELECTED,
        payload:dataKey
    })
}

export const NOMINAS_SELECIONADA_VER = (dataKey) => async (distpatch) => {
    const data = await rrhhApi.get(`/nomina/${dataKey}`)
    console.log(data)

    distpatch({
        type:NOMINA_SELECIONADA_VER_GET,
        payload:data.data.newNomina
    })
}

export const GET_EPP_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get(`/epp`)
    distpatch({
        type:GET_EPP,
        payload:data.data.verEpps
    })
}

export const GET_PUESTOS_ACTION = () => async (distpatch) => {
    const data = await rrhhApi.get(`/puestos`)
    distpatch({
        type:GET_PUESTOS,
        payload:data.data.data.puestos
    })
}

export const PUESTO_SELECT_ACTION = (id) => async (distpatch) => {
    const data = await rrhhApi.get(`/puestos/${id}`)
    distpatch({
        type:PUESTO_SELECT,
        payload:data.data.Puesto
    })
}

export const GET_DIMITIDOS_ACTION = (id) => async (distpatch) => {
    const data = await rrhhApi.get(`/empleados/${id}`)
    distpatch({
        type:GET_DIMITIDOS,
        payload:data.data.data.data
    })
}

export const BUSCADOR_EMPLEADOS_GET = (data)  => {
    return{
        type:BUSCADOR_EMPLEADOS,
        payload:data
    }
}