import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment';




const PermisoVer = (props) => {
    console.log(props.nominaSelecionada)
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
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.sueldoBruto)} RD$</div>
            </div>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Neto:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.sueldoNeto)} RD$</div>
            </div>
    
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo Fijo:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.sueldoFijo)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>AFP:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.afp)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>SFS:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.sfs)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>ISR:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.isr)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Descuentos Independientes:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.descuentos)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Total Desuento:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.totalDescuento)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Bonus:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.bonus)} RD$</div>
            </div>
         
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Regalia:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.regalia)} RD$</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Vacaciones:</div>
                <div className='verVacacionesValue'> {new Intl.NumberFormat('es-DO').format(props.nominaSelecionada?.salarioPorVacaciones)} RD$</div>
            </div>
        </div>
    );
}

const StateMapToProps = state =>{
    return {nominaSelecionada:state.nominaSelecionada.nominaSelecionada,estado:state.cambiarState}
  }
  
  export default connect(StateMapToProps,{
    
  })(PermisoVer);