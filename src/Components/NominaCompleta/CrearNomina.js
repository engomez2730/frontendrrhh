import React,{useState} from 'react';
import { Button, Form, Input,DatePicker,message,Select,Space } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';
import moment from 'moment';

const { RangePicker } = DatePicker;
const { Option } = Select;



const CrearPermiso = (props) => {

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
    
        const crearNomina = await Api.post(`nominacompleta`,{
            fecha:moment(values.fecha),
        })
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Nomina Creada con exito',3)

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
        label="Fecha de la Nomina"
        name="fecha"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}>
        <DatePicker renderExtraFooter={() => 'extra footer'} picker="month" />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Nomina
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {permisos:state.permisos.permisos,
    permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);