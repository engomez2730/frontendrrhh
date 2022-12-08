import React,{useEffect,useState} from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import {connect} from 'react-redux'
import Api from '../../apis/rrhhApi'
import { message } from 'antd';
import {  CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';



const InfoForm = (props) => {

    const [form] = Form.useForm()
    const [errorAlert,errorAlertSet] = useState('')

    useEffect(() => {
        form.setFieldsValue({
          nombre:props.usuarioEditar.nombre,
          apellido:props.usuarioEditar.apellido,
          correo:props.usuarioEditar.correo,
          celular:props.usuarioEditar.celular,
          cedula:props.usuarioEditar.cedula,
          direccion:props.usuarioEditar.direccion
      })
    }, [props.usuarioEditar]);

    const onFinish = async (values) => {
        try{
          const data = await Api.patch(`empleados/${props.usuarioEditar.key}`,{
            nombre:values.nombre,
            apellido:values.apellido,
            correo:values.correo,
            celular:values.celular,
            cedula:values.cedula,
            direccion:values.direccion,
          })
          props.CAMBIAR_ESTADO(!props.estado)
          message.success('Empleado Actualizado', 2);
        }catch(err){
          handleError(err)
        }

      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div>
             <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
            message: 'Please input your username!',
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
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="celular"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
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
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Direccion"
        name="direccion"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>



      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
    {errorAlert}
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {usuarioEditar:state.usuarioEditarSelecionado,usuarioFinal:state.usuarioEditadoFinal, estado:state.cambiarState}
}

export default connect(stateMapToProps,{
  CAMBIAR_ESTADO
})(InfoForm);
