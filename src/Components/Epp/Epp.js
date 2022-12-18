import React from 'react';
import EppStats from './EppStats'
import TableEpp from './TableEpp'
import requireAuth from '../requireAuth';


const Epp = () => {
    return (
        <div className='verAnuncios'>
            <h1>Epp</h1>
            <div className='tableDataPer'>
                <EppStats/>
                <TableEpp/>    
            </div>
        </div>
    );
}

export default requireAuth(Epp);
