import React from 'react';
import moment from 'moment';

const VerDespido = ({despido}) => {
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
            <div className='verVacacionesLabel'>Fecha del despido:</div>
            <div className='verVacacionesValue'> {moment(despido?.fechaDespido).format('MMMM Do YYYY, h:mm:ss a')}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Tipo del despido:</div>
            <div className='verVacacionesValue'> Renuncia</div>
        </div>
    </div>
    );
}

export default VerDespido;
