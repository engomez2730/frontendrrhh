import React from 'react';
import AvisosStats from './AvisosStats'
import TableAvi from './TableAvi'
import requireAuth from '../requireAuth';


const Avisos = () => {
    return (
        <div className='verAnuncios'>
            <h1>Avisos</h1>
            <div className='tableDataPer'>
                <AvisosStats/>
                <TableAvi/>    
            </div>
        </div>
    );
}

export default requireAuth(Avisos);
