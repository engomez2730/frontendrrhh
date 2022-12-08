import React from 'react';
import {connect} from 'react-redux'


const PermisoVer = (props) => {
    console.log(props.permisoSelecioandoData.permisoSelecionado)

    return (
        
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Nombre del permiso:</div>
                <div className='verVacacionesValue'> {props.permisoSelecioandoData?.permisoSelecionado?.nombre}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descripcion:</div>
                <div className='verVacacionesValue'> {props.permisoSelecioandoData.permisoSelecionado?.descripcion}</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Fecha:</div>
                <div className='verVacacionesValue'> {props.permisoSelecioandoData.permisoSelecionado?.fecha}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Empleado:</div>
                <div className='verVacacionesValue'> {`${props.permisoSelecioandoData.permisoSelecionado?.Empleados[0]?.nombre} ${props.permisoSelecioandoData.permisoSelecionado?.Empleados[0]?.apellido}` } </div>
            </div>
         {/*    <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>PrestacionesLaborales:</div>
                <div className='verVacacionesValue'> {props.permisoSelecioandoData.permisoSelecionado?.nombre} $</div>
            </div> */}
        </div>
    );
}

const StateMapToProps = state =>{
    return {permisos:state.permisos.permisos,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);