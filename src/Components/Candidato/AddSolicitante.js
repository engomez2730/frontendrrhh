import { Button, Checkbox, Form, Input } from 'antd';
import React,{useEffect} from 'react';
import rrhhApi from '../../apis/rrhhApi';
import { connect } from 'react-redux';
import {BUSCAR_SOLICITANTE_ACTION,CAMBIAR_ESTADO} from '../../actions/index'


const App = (props) => {
    const onFinish = async (values) => {
    const dataCandidato = await rrhhApi.get(`solicitantes?cedula=${values.solicitante}`)
    props.BUSCAR_SOLICITANTE_ACTION(dataCandidato.data.Solicitante[0])
    props.CAMBIAR_ESTADO(!props.estado)

  };

  const botonListener = () =>{
    props.BUSCAR_SOLICITANTE_ACTION()
    props.CAMBIAR_ESTADO(!props.estado)

  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Solicitante"
        name="solicitante"
     /*    rules={[
          {
            required: true,
            message: 'Tiene que introducir la cedula del candidato',
          },
        ]} */
      >
      <Input.Search size="medium" placeholder="Escribe la cedula del candidato" enterButton />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button onClick={()=> botonListener()}>
          Limpiar
        </Button>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
};

const stateMapToProps = (state) =>{
    return {estado:state.cambiarState}
  }
  

export default  connect(stateMapToProps,{
    BUSCAR_SOLICITANTE_ACTION,
    CAMBIAR_ESTADO
})(App);