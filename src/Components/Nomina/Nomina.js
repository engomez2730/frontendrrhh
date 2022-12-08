import React from 'react';
import './Nomina.css'
import TableNom from './TableNom';
import NominaStats from './NominaStats';
import requireAuth from '../requireAuth';
const Nomina = () => {
    return (
        <div className='nomina'>
            <h1>Nomina</h1>
            <NominaStats/>
            <TableNom/>
        </div>
    );
}

export default requireAuth(Nomina);
