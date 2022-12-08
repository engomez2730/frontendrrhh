import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,message } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
const { TextArea } = Input;

const CrearPermiso = (props) => {

    const [form] = useForm()

    useEffect(()=>{
        form.setFieldsValue({
            titulo:props.anuncios?.titulo,
            descripcion:props.anuncios?.descripcion,
            finishAt:moment(props.anuncios?.finishAt)
        })
    },[props.anuncios])

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
        const crearPermiso = await Api.patch(`anuncios/${props.anuncios?._id}`,{
            titulo:values.titulo,
            descripcion:values.descripcion,
            finishAt:values.finishAt,
        })
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Permiso Creado con exito',3)


    }catch(err){
        console.log(err.response.data.message)
        message.error(err.response.data.message,3)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form
      name="basic"
      form={form}
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
        label="Titulo del empleado"
        name="titulo"
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
        label="Fecha de Finalizacion"
        name="finishAt"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Anuncio
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