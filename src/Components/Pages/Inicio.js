import React from 'react';
import {connect} from 'react-redux'
import EmpleadoPage from './EmpleadoPage';


const Inicio = (props) => {

    const renderInicio = () =>{
        if(props.state.isLoggedIn.isLoggedIn && props.state.user.user?.rol === 'admin' ){
            return null
        }else if (props.state.isLoggedIn.isLoggedIn && props.state.user.user?.rol === 'empleado' ){
            return <EmpleadoPage/>
        }else{
            return null
        }

    }

    return (
        <div>
           {renderInicio()}
        </div>
    );
}

const stateMapToProps = state =>{
    return {state:state}
}

export default connect(stateMapToProps,{})(Inicio);
