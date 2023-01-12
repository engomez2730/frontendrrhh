import React from 'react';
import {connect} from 'react-redux'
import rrhhApi from '../../apis/rrhhApi';
import TableNomCom from './TableNomCom';



const PermisoVer = ({nomina}) => {

    return (
        
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Mes:</div>
                <div className='verVacacionesValue'> {nomina?.mes}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Año:</div>
                <div className='verVacacionesValue'> {nomina?.year}</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Estado:</div>
                <div className='verVacacionesValue'> {nomina?.estado}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Empleados:</div>
                <div className='verVacacionesValue'> {nomina?.totalEmpleados}</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Empleados Nominados:</div>
                <div className='verVacacionesValue'> {nomina?.Nominas?.length}</div>
            </div>
            <TableNomCom/>
        </div>
    );

}

const StateMapToProps = state =>{
    return {estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);