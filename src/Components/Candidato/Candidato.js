import React from 'react';
import CandidatoStats from './CandidatoStats';
import TableCandi from './TableCandi'
import requireAuth from '../requireAuth';

const Candidato = () => {
    return (
        <div className='verAnuncios'>
            <h1>Candidatos</h1>
            <div className='tableDataPer'>
                <TableCandi/>    
            </div>
    </div>
    );
}

export default requireAuth(Candidato);
