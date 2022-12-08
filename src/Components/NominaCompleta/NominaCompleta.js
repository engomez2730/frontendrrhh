import React from 'react';
import TableNomCom from './TableNomCompleta';
import NominaStatsCom from './StatsNomincaComp';
import requireAuth from '../requireAuth';

const Nomina = () => {
    return (
        <div className='nomina'>
            <h1>Nomina</h1>
            <NominaStatsCom/>
            <TableNomCom/>
        </div>
    );
}

export default requireAuth(Nomina);
