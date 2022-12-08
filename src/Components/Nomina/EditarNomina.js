import React,{useState,useEffect} from 'react';
import {connect} from 'react-redux'
import { Button,Form,message,InputNumber  } from 'antd';
import { CAMBIAR_ESTADO } from '../../actions';
import Api from '../../apis/rrhhApi'
import handleError from '../../Data/errorHandle';



const EditarVacaciones = (props) => {
    const [form] = Form.useForm()

    useEffect(()=>{
        form.setFieldsValue({
          salario:props.usuarioSelecionado?.salarioBruto,
      })
    },[props.usuarioSelecionado])

    const onFinish = async (values)  => {
            console.log(values)
            try{
            const response = await Api.patch(`empleados/nomina/${props.usuarioSelecionado?._id}`,{
                salarioBruto:values.salario,
            })
            props.CAMBIAR_ESTADO(!props.cambiarState)
            message.success('Nomina actualziadas',2);
            }catch(err){
             handleError(err)
            }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <div className='editrarVacacionesForm'>
            <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}}
                onFinish={onFinish} onFinishFailed={onFinishFailed} autoComplete="off" form={form}>
                <Form.Item  label='Salario' name='salario' wrapperCol={{offset: 8,span: 16,}}>
                    <InputNumber/>  
                </Form.Item>
                <Form.Item  wrapperCol={{offset: 8,span: 16,}}>
                        <Button type="primary" htmlType="submit">
                        Editar Nomina
                        </Button>   
                </Form.Item>
            </Form>
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {
       estado:state.cambiarState,
       usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer
      }
}

export default connect(stateMapToProps,{
    CAMBIAR_ESTADO
})(EditarVacaciones);
