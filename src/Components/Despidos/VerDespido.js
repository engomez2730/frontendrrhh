import React from 'react';
import moment from 'moment';

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
            <div className='verVacacionesValue'> {new Intl.DateTimeFormat('es-DO',{ dateStyle: 'full', timeStyle: 'short' }).format(despido?.createdAt)}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Prestaciones Laborables:</div>
            <div className='verVacacionesValue'> { new Intl.NumberFormat('es-Do').format(despido?.prestacionesLaborables)}$</div>
        </div>
    </div>
    );
}

export default VerDespido;
