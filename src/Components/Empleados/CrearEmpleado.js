import './CrearEmpleado.css'
import React from 'react';
import Form from './Form';
import requireAuth from '../requireAuth';
import AddCandidato from './AddCandidato'
const CrearEmpleado = () => {

  return (
    <div className='crearEmpleado'>
        <AddCandidato/>
        <Form/>
    </div>
  );
};

export default requireAuth(CrearEmpleado);
