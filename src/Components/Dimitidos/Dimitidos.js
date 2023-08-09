import React from 'react';
import DimitidosStats from './DimitidosStats'
import DimitidosTable from './DimitidosTable';

const Despidos = () => {
    return (
        <div className='verAnuncios'>
        <h1>Dimitidos</h1>
        <div className='tableDataPer'>
              <DimitidosTable/>
        </div>
    </div>
    );
}

export default Despidos;
