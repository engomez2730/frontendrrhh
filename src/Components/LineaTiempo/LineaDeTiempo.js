import React from 'react';
import TableLinea from './TablaLinea';
import requireAuth from '../requireAuth';

const Nomina = () => {
    return (
        <div className='nomina'>
            <h1>Linea de Tiempo</h1>
            <TableLinea/>
        </div>
    );
}

export default requireAuth(Nomina);
