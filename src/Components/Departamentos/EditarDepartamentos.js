import React,{useState} from 'react';
import { Button, Form, Input, Radio,message } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';





const EditarEmpleados = (props) => {
    
    const [form] = Form.useForm()

    useState(()=>{
        form.setFieldsValue({
            nombre:props.departamento?.nombre,
            encargado:props.departamento?.encargado,
            descripcion:props.departamento?.descripcion
        })
    },[props.departamento])


    const onFinish = async (values) => {
        try{
          const response = await Api.patch(`departamentos/${props.departamento.key}`,{
            nombre:values.nombre,
            encargado:values.encargado,
            descripcion:values.descripcion
          })
          props.CAMBIAR_ESTADO(!props.estado)
          message.success('Departamento editado con exito', 2);


        }catch(err){
            handleError(err)

        }
      };
    
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className='crearDepartamento'>
            <Form   layout="vertical" 
                    size='large' 
                    className='formCrearEmpleado' 
                    onFinish={onFinish} 
                    onFinishFailed={onFinishFailed}
                    initialValues={{remember: true}} 
                    form={form}>
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
                    <Input placeholder="input placeholder" />
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
                    <Button type="primary" htmlType="submit">Editar Departamento</Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const StateMapToProps = (state) =>{
    return {departamento:state.departamentoSelecionado.departamentoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
    CAMBIAR_ESTADO
})(EditarEmpleados);
