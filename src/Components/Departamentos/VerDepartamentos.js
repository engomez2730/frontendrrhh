import React from 'react';
import './VerDepartamentos.css'
import StatsCardContainer from '../Empleados/StatsCardContainer';
import StatsContainer from './StatsContainer';
import TableDep from './TableDep'
import requireAuth from '../requireAuth';

const VerDepartamentos = () => {
    return (
        <div className='verDepartamentos'>
            <h1>Ver Departamentos</h1>
            <div className='tableDataDepar'>
                <StatsContainer/>
                <TableDep/>
            </div>
        </div>
    );
}

export default requireAuth(VerDepartamentos);
