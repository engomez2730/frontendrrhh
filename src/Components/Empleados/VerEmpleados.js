import React from 'react';
import './VerEmpleados.css'
import StatsCard from './StatsCardContainer';
import Table from '../Empleados/Table';
import requireAuth from '../requireAuth';
const VerEmpleados = () => {

    return (
        <div className='verEmpleados'>
            <h1>Ver Empleados</h1>
            <div className='tabledata'>
            <StatsCard/>
            <Table />
            </div>
        </div>
    );
}


export default requireAuth(VerEmpleados);
