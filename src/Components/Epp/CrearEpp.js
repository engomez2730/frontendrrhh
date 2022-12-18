import React,{useState} from 'react';
import { Button, Form, Input,DatePicker,message,Select,Checkbox  } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';



const CrearPermiso = (props) => {

    const [camisa,setCamisa] = useState(false)
    const [botas,setbotas] = useState(false)
    const [lentes,setlentes] = useState(false)
  

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
        await Api.post(`epp`,{
            camisa:camisa,
            botas:botas,
            lentes:lentes,
            Usuario:props?.usuario._id
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

  const onChangeCamisa = (e) => {
    console.log(e.target.checked);
    setCamisa(e.target.checked)
  };
  const onChangeBotas = (e) => {
    console.log(e.target.checked);
    setbotas(e.target.checked)
  };
  const onChangeLentes = (e) => {
    console.log(e.target.checked);
    setlentes(e.target.checked)
  };

  return (
    <Form name="basic" labelCol={{ span: 8,}} wrapperCol={{span: 8,}}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Camisa" name="camisa">
        <Checkbox onChange={onChangeCamisa}/>
      </Form.Item>

      <Form.Item  label="Lentes" name="lentes">
        <Checkbox onChange={onChangeLentes}/>
      </Form.Item>

      <Form.Item label="Botas" name="botas">
        <Checkbox onChange={onChangeBotas}/>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Epp
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);