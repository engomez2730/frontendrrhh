import React,{useState,useEffect} from 'react';
import { Button, Form, Input,DatePicker,message,InputNumber,Select  } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO,GET_PUESTOS_ACTION } from '../../actions';
import handleError from '../../Data/errorHandle';
import {horariosFinal,puestosFinal} from '../../Data/CountriesData'

const { TextArea } = Input;
const { Option } = Select;

const CrearPermiso = (props) => {

  useEffect(() => {

    props.GET_PUESTOS_ACTION()
  },[props.estado]);

  const puestos = props?.puestos?.map((e) => e.nombre)

  const crearSelectArray = (array) =>{
    return array?.map((e)=>{
        return{
            label:e,
            value:e
        }
  })
 }

 const puestosFinalArray = crearSelectArray(puestos)




  const onFinish = async(values) => {
    try{
        const crearPermiso = await Api.post(`vacantes`,{
            nombre:values.nombre,
            descripcion:values.descripcion,
            trabajadoresRequeridos:values.trabajadoresRequeridos,
            puesto:values.puesto,
            horario:values.horario,
            razonApertura:values.razonApertura
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

  const renderDepartamentos = (provincas) =>{
    return provincas?.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }

  
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
        label="Nombre de la Vacante"
        name="nombre"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}>
        <Input />
      </Form.Item>
        <Form.Item
          name="puesto"
          label="Puesto"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="Seleciona el Puesto">
               {renderDepartamentos(puestosFinalArray)}
          </Select>
      </Form.Item>

      <Form.Item
        label="Horario"
        name="horario"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una descripcion',
          },
        ]}
      >
        <Select placeholder="Seleciona el tipo de Horario">
               {renderDepartamentos(horariosFinal)}
          </Select>
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

      <Form.Item label="Razon de Apertura" name="razonApertura">
        <TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        label="Número de Trabajadores" name="trabajadoresRequeridos"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce una fecha',
          },
        ]}
      >
            <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Vacante
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {
    permisos:state.permisos.permisos,
    permisoSelecioandoData:state.permisoSelecionado, 
    estado:state.cambiarState,
    puestos:state.puestos.puestos

  }
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION
})(CrearPermiso);