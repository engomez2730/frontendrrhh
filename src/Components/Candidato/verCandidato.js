import React from 'react';

const VerCandidato = ({candidato}) => {
    return (
        <div className='verVacacionesModal'>

        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Nombre:</div>
            <div className='verVacacionesValue'> {candidato?.nombre}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Apellido:</div>
            <div className='verVacacionesValue'> {candidato?.apellido}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Cedula:</div>
            <div className='verVacacionesValue'>{candidato?.cedula}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Celular:</div>
            <div className='verVacacionesValue'>{candidato?.celular}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Correo:</div>
            <div className='verVacacionesValue'>{candidato?.correo}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Pais:</div>
            <div className='verVacacionesValue'>{candidato?.pais}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Provincia:</div>
            <div className='verVacacionesValue'>{candidato?.provincia}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Direccion:</div>
            <div className='verVacacionesValue'>{candidato?.direccion}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Estado Laboral:</div>
            <div className='verVacacionesValue'>{candidato?.estadoLaboral}</div>
        </div>
        <div className='verVacacionesItem'>
            <div className='verVacacionesLabel'>Vacante Aplicada:</div>
            <div className='verVacacionesValue'>{candidato?.vacanteAplicada}</div>
        </div>
    </div>
    );
}

export default VerCandidato;



