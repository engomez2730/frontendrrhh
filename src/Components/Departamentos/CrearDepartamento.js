import React from 'react';
import './CrearDepartamento.css'
import { Button, Form, Input, Radio,message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Api from '../../apis/rrhhApi'
import handleError from '../../Data/errorHandle';


const VerDepartamentos = () => {

    const onFinish = async (values) => {
        console.log('Success:', values);
        try{
          const response = await Api.post('departamentos/',{
            nombre:values.nombre,
            encargado:values.encargado,
            descripcion:values.descripcion
          })
          message.success('Departamento creado con exito', 2);

        }catch(err){
            handleError(err)
        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className='crearDepartamento'>
            <Form layout="vertical" size='large' className='formCrearEmpleado' onFinish={onFinish} onFinishFailed={onFinishFailed}>
                <Form.Item label="Nombre del Departamento" name='nombre' rules={[
            {
              required: true,
              message: 'Tienes que introducir el nombre del departamento',
            },
          ]}>
                    <Input placeholder="input placeholder" />
                </Form.Item>
                <Form.Item label="Nombre del Encargado" name='encargado' rules={[
            {
              required: true,
              message: 'Tienes que introducir el nombre del encargado',
            },
          ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Descripción" name='descripcion'rules={[
            {
              required: true,
              message: 'Tienes que introducir una descripcion',
            },
          ]}>
                    <TextArea placeholder="input placeholder" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Crear Departamento</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default VerDepartamentos;
