import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment';




const PermisoVer = (props) => {
    return (
        
        <div className='verVacacionesModal'>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Mes:</div>
                <div className='verVacacionesValue'> {props?.nominaSelecionada?.mes} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Año:</div>
                <div className='verVacacionesValue'> {props?.nominaSelecionada?.year} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Bruto:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.sueldoBruto)} RD$</div>
            </div>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Bruto:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.sueldoBruto)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Neto:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.sueldoNeto)} RD$</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Fijo:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.sueldoFijo)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Bonus:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.bonus)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descuentos:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.descuentos)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Regalia:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.regalia)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Vacaciones:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('en-IN').format(props.nominaSelecionada?.salarioPorVacaciones)} RD$</div>
            </div>
        </div>
    );
}

const StateMapToProps = state =>{
    return {nominaSelecionada:state.nominaSelecionada.nominaSelecionada,estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);