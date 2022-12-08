import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import { Button,Form,message,InputNumber,Input,Checkbox,DatePicker  } from 'antd';
import { CAMBIAR_ESTADO } from '../../actions';
import moment from 'moment';
import Api from '../../apis/rrhhApi'
import { ConsoleSqlOutlined } from '@ant-design/icons';
import handleError from '../../Data/errorHandle';

const { TextArea } = Input;



const EditarPermisos = (props) => {
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({
          nombre:props.permisoSelecionadoEditar.permisoSelecionado?.nombre,
          descripcion:props.permisoSelecionadoEditar.permisoSelecionado?.descripcion,
          fecha:moment(props.permisoSelecionadoEditar.permisoSelecionado?.fecha),
      })
    },[props.permisoSelecionadoEditar?.permisoSelecionado])

    const onFinish = async (values)  => {
    
            try{
                const response = await Api.patch(`/permisos/${props.permisoSelecionadoEditar.permisoSelecionado?._id}`,{
                    nombre:values.nombre,
                    descripcion:values.descripcion,
                    fecha:values.fecha,
                })
                props.CAMBIAR_ESTADO(!props.estado)
                message.success('Permiso actualziado',2);
            }catch(err){
                handleError(err)
            }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className=''>
           <Form name="basic" labelCol={{span: 8 }} wrapperCol={{span: 16,}} initialValues={{ remember: true,}}
                 onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" form={form}>
                <Form.Item label="Nombre" name="nombre">
                    <Input />
                </Form.Item>

                <Form.Item label="Descripcion" name="descripcion">
                    <TextArea />
                </Form.Item>

                <Form.Item label="Fecha" name="fecha">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Empleado" name="empleado">
                {`${props.permisoSelecionadoEditar.permisoSelecionado?.Empleados[0]?.nombre|| ''} ${props.permisoSelecionadoEditar.permisoSelecionado?.Empleados[0]?.apellido || ''}`}
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                    <Button type="primary" htmlType="submit">
                    Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {
       estado:state.cambiarState,
       permisoSelecionadoEditar:state.permisoSelecionado
      }
}

export default connect(stateMapToProps,{
    CAMBIAR_ESTADO
})(EditarPermisos);
