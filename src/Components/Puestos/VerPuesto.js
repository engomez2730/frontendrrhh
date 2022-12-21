import React from 'react';
import {connect} from 'react-redux'



const PermisoVer = (props) => {
    console.log(props)
    return (
        
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Nombre del Puesto:</div>
                <div className='verVacacionesValue'> {props.puesto?.nombre}</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descripcion del puesto:</div>
                <div className='verVacacionesValue'> {props.puesto?.descripcion}</div>
            </div>
        </div>
    );
}

const StateMapToProps = state =>{
    return {estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);