import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,message,InputNumber } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import handleError from '../../Data/errorHandle';
const { TextArea } = Input;

const EditarSolicitante = (props) => {

    const [form] = useForm()
    console.log(props.solicitante)

    useEffect(()=>{
        form.setFieldsValue({
            nombre:props.solicitante?.nombre,
            apellido:props.solicitante?.apellido,
            correo:props.solicitante?.correo,
            celular:props.solicitante?.celular,
            cedula:props.solicitante?.cedula
        })
    },[props.vacanteSelecionada])

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
        const EditarSolicitante = await Api.patch(`solicitantes/${props.solicitante?._id}`,{
            nombre:values.nombre,
            apellido:values.apellido,
            correo:values.correo,
            celular:values.celular,
            cedula:values.cedula
        })
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
        label="Cedula"
        name="cedula"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <InputNumber />
      </Form.Item>
      <Form.Item label="Celular"  name="celular"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
         <InputNumber />
      </Form.Item>

      <Form.Item wrapperCol={{offset: 8,span: 16,}}>
        <Button type="primary" htmlType="submit">
          Editar Solicitante
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {vacanteSelecionada:state.VacanteSelecionada?.vacanteSelecionada,estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(EditarSolicitante);