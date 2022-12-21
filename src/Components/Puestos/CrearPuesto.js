import React,{useState} from 'react';
import { Button, Form, Input,DatePicker,message,Select } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;

const CrearPermiso = (props) => {

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
    
        const crearPermiso = await Api.post(`puestos`,{
            nombre:values.nombre,
            descripcion:values.descripcion,
        })
        console.log(crearPermiso)
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Permiso Creado con exito',3)


    }catch(err){
        handleError(err)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 8,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre del Puesto"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripcion"
        name="descripcion"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una descripcion',
          },
        ]}
      >
        <TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Anuncio
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {permisos:state.permisos.permisos,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);