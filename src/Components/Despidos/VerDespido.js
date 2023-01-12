import React from 'react';
import 'moment/locale/es'
import moment from 'moment';  // without this line it didn't work
moment.locale('es')

const VerDespido = ({despido}) => {

    console.log(despido)
    return (
        <div className='verVacacionesModal'>

        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Nombre del empleado despedido:</div>
            <div className='verVacacionesValue'> {`${despido?.Usuario?.nombre} ${despido?.Usuario?.apellido}`}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Razon:</div>
            <div className='verVacacionesValue'> {despido?.razon}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Tipo de Despido:</div>
            <div className='verVacacionesValue'> {despido?.tipoDeDespido}</div>
        </div>

        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Fecha del despido:</div>
            <div className='verVacacionesValue'> {moment(despido?.fechaDeDespido).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Prestaciones Laborables:</div>
            <div className='verVacacionesValue'> { new Intl.NumberFormat('es-Do').format(despido?.prestacionesLaborables)}$</div>
        </div>
    </div>
    );
}

export default VerDespido;
