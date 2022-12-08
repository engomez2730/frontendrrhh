import React from 'react';

const VerVacante = ({solicitante}) => {
    return (
        <div className='verVacacionesModal'>

        <div className='verVacacionesItem' key='1'>
            <div className='verVacacionesLabel'>Nombre del Solicitante:</div>
            <div className='verVacacionesValue'> {solicitante?.nombre}</div>
        </div>
        <div className='verVacacionesItem' key='2'>
            <div className='verVacacionesLabel'>Apellido del Solicitante:</div>
            <div className='verVacacionesValue'> {solicitante?.apellido}</div>
        </div>
        <div className='verVacacionesItem' key='3'>
            <div className='verVacacionesLabel'>Correo del Solicitante:</div>
            <div className='verVacacionesValue'> {solicitante?.correo}</div>
        </div>
        <div className='verVacacionesItem' key='4'>
            <div className='verVacacionesLabel'>Cedula del Solicitante:</div>
            <div className='verVacacionesValue'> {solicitante?.cedula}</div>
        </div>
        <div className='verVacacionesItem' key='5'>
            <div className='verVacacionesLabel'>Telefono del Solicitante</div>
            <div className='verVacacionesValue'> {solicitante?.celular}</div>
        </div>
    </div>
    );
}

export default VerVacante;
