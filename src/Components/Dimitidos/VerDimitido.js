import React from 'react';
import moment from 'moment';


const NominaVer = ({Dimitido}) => {
    return (
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Nombre Completo:</div>
                <div className='verVacacionesValue'> {`${Dimitido?.nombre} ${Dimitido?.apellido}`} </div>
            </div>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Cedula:</div>
                <div className='verVacacionesValue'> {Dimitido?.cedula} </div>
            </div>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Celualr:</div>
                <div className='verVacacionesValue'> {Dimitido?.celular} </div>
            </div>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sexo:</div>
                <div className='verVacacionesValue'> {Dimitido?.sexo} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Pais:</div>
                <div className='verVacacionesValue'> {Dimitido?.pais} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Departamento:</div>
                <div className='verVacacionesValue'> {Dimitido?.departamento} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Puesto:</div>
                <div className='verVacacionesValue'> {Dimitido?.puesto} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Sueldo:</div>
                <div className='verVacacionesValue'> {Dimitido?.sueldoFijo} </div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Llegada a la empresa:</div>
                <div className='verVacacionesValue'> {moment(Dimitido?.createdAt).format('MMMM Do YYYY')} </div>
            </div>
           
        </div>
    );
}



export default NominaVer;
