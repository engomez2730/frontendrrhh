import React,{useEffect,useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {connect} from 'react-redux'


const EditarEmpleado = (props) => {

    return (
        <div>
            ddd
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {usuarioEditar:state.usuarioEditarSelecionado}
}

export default connect(stateMapToProps,{

})(EditarEmpleado);
