import React from 'react';
import PuestoStats from './StatsTablePuestos'
import TablePuestos from './TablePuestos'
import requireAuth from '../requireAuth';


const Avisos = () => {
    return (
        <div className='verAnuncios'>
            <h1>Puestos</h1>
            <div className='tableDataPer'>
                <TablePuestos/>    
            </div>
        </div>
    );
}

export default requireAuth(Avisos);
