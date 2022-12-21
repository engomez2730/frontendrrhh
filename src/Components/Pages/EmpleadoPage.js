import React from 'react';
import './EmpleadoPage.css'
import { connect } from 'react-redux';
import PersonInfo from './Empleados/PersonalInfo';
import AnunciosEmpleado from './Empleados/AnunciosEmpleado';
import Config from './Empleados/Config';

const EmpleadoPage = (props) => {
    return (
        <>
            <h1 style={{paddingLeft:'60px'}}>Hola {props?.user.nombre}</h1>
            <div className='empleadoPage'>
                <PersonInfo user={props?.user}/>
                <AnunciosEmpleado user={props?.user}/>
                <Config user={props?.user}/>
            </div>
        </>
    )
}

const stateMapToProps = (state) =>{
    return {user:state.user.user}
}

export default connect(stateMapToProps,{

})(EmpleadoPage);
