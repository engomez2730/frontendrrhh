import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment';



const PermisoVer = (props) => {
    return (
        
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Nombre del Anuncio:</div>
                <div className='verVacacionesValue'> {props.anuncios?.titulo}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descripcion:</div>
                <div className='verVacacionesValue'> {props.anuncios?.descripcion}</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Fecha de Finalizacion:</div>
                <div className='verVacacionesValue'> {moment(props.anuncios?.finishAt).format('MMMM Do YYYY, h:mm:ss a')}</div>
            </div>
        </div>
    );
}

const StateMapToProps = state =>{
    return {anuncios:state.AvisoSelecionado?.avisoSelecionado,estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);