import React from 'react';
import StatsDespidos from './StatsDespidos';
import TableDespidos from './TableDespidos';

const Despidos = () => {
    return (
        <div className='verAnuncios'>
        <h1>Despidos</h1>
        <div className='tableDataPer'>
            <StatsDespidos/>
            <TableDespidos/>    
        </div>
    </div>
    );
}

export default Despidos;
