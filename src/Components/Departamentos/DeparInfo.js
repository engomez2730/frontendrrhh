import React from 'react';
import './DeparInfo.css'

const DeparInfo = (props) => {
    return (
        <div className='deparInfo'>
            <div className='deparInfo-item'>
                <span className='title-item-info'>Nombre: </span>{props.departamento.nombre}
            </div>
            <div className='deparInfo-item'>
                <span className='title-item-info'>Encargado: </span>{props.departamento.encargado}
            </div>
            <div className='deparInfo-item'>
                <span className='title-item-info'>Descripcion: </span>{props.departamento.descripcion}
            </div>
            <div className='deparInfo-item'>
                <span className='title-item-info'>Cantidad de Empleados: </span>{props.departamento.empleados.length}
            </div>
        </div>
    );
}

export default DeparInfo;
