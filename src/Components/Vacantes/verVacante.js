import React from 'react';
import TableSolic from './TableSolic';

const VerVacante = ({vacante}) => {
    return (
        <div className='verVacacionesModal'>

        <div className='verVacacionesItem' key='1'>
            <div className='verVacacionesLabel'>Nombre de la vacante:</div>
            <div className='verVacacionesValue'> {vacante?.nombre}</div>
        </div>
        <div className='verVacacionesItem' key='3'>
            <div className='verVacacionesLabel'>Descripcion:</div>
            <div className='verVacacionesValue'> {vacante?.descripcion}</div>
        </div>

        <div className='verVacacionesItem' key='4'>
            <div className='verVacacionesLabel'>Puesto de la vacante:</div>
            <div className='verVacacionesValue'> {vacante?.puesto}</div>
        </div>
        <div className='verVacacionesItem' key='5'>
            <div className='verVacacionesLabel'>Cantidad de trabajadores requeridos:</div>
            <div className='verVacacionesValue'> {vacante?.trabajadoresRequeridos}</div>
        </div>
        <div className='verVacacionesItem' key='6'>
            <div className='verVacacionesLabel'>Cantidad de trabajadores registrados:</div>
            <div className='verVacacionesValue'> {vacante?.Solicitantes.length}</div>
        </div>
        <TableSolic Solicitantes={vacante?.Solicitantes}/>
    </div>
    );
}

export default VerVacante;
