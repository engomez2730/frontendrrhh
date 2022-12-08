import React from 'react';
import StatsPerm from './StatsPerm';
import TablePerm from './TablePerm'
import requireAuth from '../requireAuth';
const Permisos = () => {
    return (
        <div className='verPermisos'>
             <h1>Permisos</h1>
            <div className='tableDataPer'>
                <StatsPerm/>
                <TablePerm/>    
            </div>
        </div>
    );
}

export default requireAuth(Permisos);
