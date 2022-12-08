import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,message,InputNumber } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import { useForm } from 'antd/lib/form/Form';
import moment from 'moment';
import handleError from '../../Data/errorHandle';
const { TextArea } = Input;

const CrearPermiso = (props) => {

    const [form] = useForm()
    console.log(props.vacanteSelecionada?.nombre  )


    useEffect(()=>{
        form.setFieldsValue({
            nombre:props.vacanteSelecionada?.nombre,
            descripcion:props.vacanteSelecionada?.descripcion,
            puesto:props.vacanteSelecionada?.puesto,
            trabajadoresRequeridos:props.vacanteSelecionada?.trabajadoresRequeridos
        })
    },[props.vacanteSelecionada])

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
        const crearPermiso = await Api.patch(`vacantes/${props.vacanteSelecionada?._id}`,{
            nombre:values.nombre,
            descripcion:values.descripcion,
            puesto:values.puesto,
            trabajadoresRequeridos:values.trabajadoresRequeridos
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
        label="Nombre de la vacante"
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
        label="Puesto"
        name="puesto"
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
        label="Cantidad de empleados requeridos"
        name="trabajadoresRequeridos"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Vacante
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
})(CrearPermiso);