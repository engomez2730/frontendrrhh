import React,{useState} from 'react';
import { Button, Form, Input,DatePicker,message,Select } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import MostrarDepar from './mostrarDepar'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
const { TextArea } = Input;

const CrearPermiso = (props) => {

  const onFinish = async(values) => {
    console.log('Success:', values);
    try{
    
        const crearPermiso = await Api.post(`anuncios`,{
            titulo:values.titulo,
            descripcion:values.descripcion,
            finishAt:values.finishAt,
            departamentos:values.departamentos
        })
        console.log(crearPermiso)
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Permiso Creado con exito',3)


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
        label="Nombre del anuncio"
        name="titulo"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}>
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

      <Form.Item
        label="Fecha de Finalización"
        name="finishAt"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <DatePicker />
      </Form.Item>
      <Form.Item
        label="Departamentos a mostrar"
        name="departamentos"
      >
                  <Select 
  mode="multiple" 
  style={{width: '100%',}} 
  placeholder="Seleciona los departamentos" 
  onChange={handleChange} 
>
    <Option value="Todos" label="Todos">
      <div className="demo-option-label-item">
        Todos
      </div>
    </Option>
    <Option value="Administracion" label="Administracion">
      <div className="demo-option-label-item">
        Administracion
      </div>
    </Option>
    <Option value="Taller" label="Taller">
      <div className="demo-option-label-item">
        Taller
      </div>
    </Option>
    <Option value="Barrick" label="Barrick">
      <div className="demo-option-label-item">
        Barrick
      </div>
    </Option>
    <Option value="Falcondo" label="Falcondo">
      <div className="demo-option-label-item">
        Falcondo
      </div>
    </Option>
    <Option value="Planta de Agregados" label="Planta de Agregados">
      <div className="demo-option-label-item">
        Planta de Agregados
      </div>
    </Option>
    <Option value="Inmobiliaria" label="Inmobiliaria">
      <div className="demo-option-label-item">
        Inmobiliaria
      </div>
    </Option>
    <Option value="Rio" label="Rio">
      <div className="demo-option-label-item">
        Rio
      </div>
    </Option>
    <Option value="Topografia" label="Topografia">
      <div className="demo-option-label-item">
        Topografia
      </div>
    </Option>
    <Option value="Campamento" label="Campamento">
      <div className="demo-option-label-item">
        Campamento
      </div>
    </Option>
    
  </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Anuncio
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {permisos:state.permisos.permisos,permisoSelecioandoData:state.permisoSelecionado, estado:state.cambiarState}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);