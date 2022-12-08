import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,message } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import handleError from '../../Data/errorHandle';
import { CAMBIAR_ESTADO } from '../../actions';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
const { TextArea } = Input;

const CrearPermiso = (props) => {

  const onFinish = async(values) => {
    console.log('Success:', values);
    console.log(props.vacante)
    try{
        const crearSolicitante = await Api.post(`solicitantes/${props.vacante?._id}`,{
            nombre:values.nombre,
            apellido:values.apellido,
            cedula:values.cedula,
            celular:values.celular,
            correo:values.correo,
            puesto:props.vacante?.puesto,
            doc:values.doc,
        },{
          headers:{
            'Content-Type':'multipart/form-data'
          }
        })
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Solicitud Creada con exito',3)


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
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una descripcion',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cedula"
        name="cedula"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una descripcion',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Numero de telefono"
        name="celular"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una descripcion',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Correo"
        name="correo"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <Input />
      </Form.Item>
      <Form.Item
        label="Curriculum (Formato pdf y Word)"
        name="doc"
        rules={[{required: true, message: 'Por Favor Introduce tu Curriculum',},]}>
            <input type='file'/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Solicitar Vacante
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {anuncios:state.AvisoSelecionado?.avisoSelecionado,estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);