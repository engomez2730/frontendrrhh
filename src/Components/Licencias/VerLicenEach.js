import moment from 'moment';
import React from 'react';
import {connect} from 'react-redux'


const PermisoVer = ({licencia}) => {

    return (
        
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Razon de Licencia:</div>
                <div className='verVacacionesValue'> {licencia?.razon}</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Fecha:</div>
                <div className='verVacacionesValue'>Del {moment(licencia?.tiempoDeLicencia[0]).format('MMMM Do YYYY')} hasta {moment(licencia?.tiempoDeLicencia[1]).format('MMMM Do YYYY')}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descripcion:</div>
                <div className='verVacacionesValue'> {licencia?.descripcion}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Estado de Licencia:</div>
                <div className='verVacacionesValue'>{licencia?.estado ? <div>Activo</div> : <div>Inactivo</div>}</div>
            </div>
        </div>
    );
}

const StateMapToProps = state =>{
    return {licencia:state.licenciaSelecionada.licenciaSelect,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);