import React from 'react';


const NominaVer = (props) => {
    console.log(props)


    return (
        <div className='verVacacionesModal'>

            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Salario Brutos:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD', { maximumSignificantDigits: 4 }).format(props.usuario?.salarioBruto))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Salario Neto:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD', { maximumSignificantDigits: 3 }).format(props.usuario?.salarioNeto))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Total del Descuento:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD', { maximumSignificantDigits: 3 }).format(props.usuario?.DescuentoTotal))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Salario Anual:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD').format(props.usuario?.salarioAnual))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Salario por Vacaciones:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD').format(props.usuario?.salarioPorVacaciones))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>Regalia:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD').format(props.usuario?.regalia))} $</div>
            </div>
            <div className='verVacacionesItem'>
                <div className='verVacacionesLabel'>PrestacionesLaborales:</div>
                <div className='verVacacionesValue'> {(new Intl.NumberFormat('es-RD').format(props.usuario?.PrestacionesLaborales))} $</div>
            </div>
        </div>
    );
}



export default NominaVer;
