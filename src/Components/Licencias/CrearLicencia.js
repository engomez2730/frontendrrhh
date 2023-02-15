import React,{useState} from 'react';
import { Button, Form, Input,DatePicker,message } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const CrearPermiso = (props) => {

  const [usuarioSelec, usuarioSelecSet] = useState([])

  const rangeConfig = {rules: [{type: 'array'},],};

  const onFinish = async(values) => {
    try{
        const crearPermiso = await Api.post(`licencias`,{
            razon:values.razon,
            descripcion:values.descripcion,
            tiempoDeLicencia:values.tiempoDeLicencia,
            lugarDelReposo:values.lugarDelReposo,
            empleado:props?.usuario?._id
        })
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Licencia Creada con exito',3)


    }catch(err){
        handleError(err)
    }
  };
  const onFinishFailed = (errorInfo) => {
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
        label="Razon Licencia"
        name="razon"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una razon',
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

      <Form.Item name="tiempoDeLicencia" label="Tiempo de Licencia"  {...rangeConfig} rules={[
          {
            required: true,
            message: 'Por Favor Introduce la cedula del empleado',
          },
        ]}>
                  <RangePicker/>
    </Form.Item>
    <Form.Item
        label="Lugar de Reposo"
        name="lugarDelReposo"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un lugar de reposo',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Empleado Selecionado">
         <Input  value={props?.usuario?.nombre}/> 
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Licencia
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {usuario:state.usuarioSelecionadoVer.usuarioSelecionadoVer,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);