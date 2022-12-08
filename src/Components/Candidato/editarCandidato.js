import { Button, Checkbox, Form, Input,Select,message  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React,{useEffect} from 'react';
import rrhhApi from '../../apis/rrhhApi';
import { BUSCAR_SOLICITANTE_ACTION, CAMBIAR_ESTADO } from '../../actions';
import {connect} from 'react-redux'
import {paisesFinal,provinciasFinal,departamentosFinal,puestosFinal,estadoCandidatoFinal} from '../../Data/CountriesData'
import handleError from '../../Data/errorHandle';
const { Option } = Select;



const App = (props) => {

  const [form] = Form.useForm()
  
  useEffect(()=>{
    form.setFieldsValue({
      nombre:props.solicitante?.nombre,
      apellido:props.solicitante?.apellido,
      cedula:props.solicitante?.cedula,
      celular:props.solicitante?.celular,
      correo:props.solicitante?.correo,
      pais:props.solicitante?.pais,
      provincia:props.solicitante?.provincia,
      puestoAplicado:props.solicitante?.puestoAplicado,
      direccion:props.solicitante?.direccion,
      estadoLaboral:props.solicitante?.estadoLaboral,
    },[props.solicitante])
  },[props.solicitante])


  const onFinish = (values) => {
    try{
      const data = rrhhApi.patch(`entrevistados/${props.solicitante?._id}`,{
        nombre:values.nombre,
        apellido:values.apellido,
        correo:values.correo,
        celular:values.celular,
        cedula:values.cedula,
        provincia:values.provincia,
        pais:values.pais,
        puestoAplicado:values.puestoAplicado,
        direccion:values.direccion,
        entrevistado:values.entrevistado,
        estadoLaboral:values.estadoLaboral
      })
  
      props.CAMBIAR_ESTADO(!props.estado)
      message.success('Creado con Exito')
      console.log('Success:', values);

    }catch(err){
      handleError(err)
    } 

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const renderDepartamentos = (provincas) =>{
    return provincas.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }

  const renderPaises = (Countries) =>{
    return Countries.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }

  const renderProvincias = (provincas) =>{
    return provincas.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }
  return (
    <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 32,}} initialValues={{ remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{width:'500px' }}
      form={form}
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
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Cedula"
        name="cedula"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="celular"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Correo"
        name="correo"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Pais"
        name="pais"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
           <Select placeholder="Seleciona el Pais">
               {renderPaises(paisesFinal)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Provincia"
        name="provincia"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
          <Select placeholder="Seleciona la provincia">
               {renderProvincias(provinciasFinal)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Puesto"
        name="puestoAplicado"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
          <Select placeholder="Seleciona el tipo de Departamento">
               {renderDepartamentos(puestosFinal)}
          </Select>
      </Form.Item>
      <Form.Item
        label="Direccion"
        name="direccion"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Estado Laboral"
        name="estadoLaboral"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Select placeholder="Seleciona la provincia">
               {renderProvincias(estadoCandidatoFinal)}
          </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar 
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) =>{
  return {estado:state.cambiarState, solicitante:state.candidatoSelecionado.candidatoSelec}
}

export default connect(StateMapToProps,{
  BUSCAR_SOLICITANTE_ACTION,CAMBIAR_ESTADO
})(App);