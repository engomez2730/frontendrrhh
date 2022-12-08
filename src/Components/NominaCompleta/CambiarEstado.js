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

  const renderOpciones = (Countries) =>{
    return Countries.map((e,index) =>{
        return <Option value={`${e}`} key={index}>{e}</Option> 
    })
  }

  const onFinish = async(values) => {
    console.log(props.nominaCompletaSelect._id);
    try{
        await Api.patch(`nominacompleta/${props.nominaCompletaSelect._id}`,{
            estado:values.estado,
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
        label="Estado de la Nomina"
        name="estado"
        rules={[
          {
            required: true,
            message: 'Introduce un estado',
          },
        ]}>
        <Select>
          {renderOpciones(['Pendiente','Completa','Autorizada'])}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Cambiar Estado
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {
    permisos:state.permisos.permisos,
    nominaCompletaSelect:state.nominaCompletaSelect.nominaCompletaSelect,
    estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);