import React from 'react';
import './Candidato.css'
import AddSolicitante from './AddSolicitante';
import CrearCandidato from './CrearCandidato'

const ModalData = () => {
    return (
        <div className='modalData'>
            <AddSolicitante/>
            <CrearCandidato/>
        </div>
    );
}

export default ModalData;
