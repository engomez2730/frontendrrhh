import React from 'react';
import './Vacaciones.css'
import StatsVacaciones from './StatsVacaciones';
import TableVac from './TableVac';
import requireAuth from '../requireAuth';

const Vacaciones = () => {
    return (
        <div className='verVacaciones'>
            <h1>Vacaciones</h1>
            <div className='tableDataVac'>
 {                <TableVac/>
}            </div>
        </div>
    );
}

export default requireAuth(Vacaciones);
