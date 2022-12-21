import {
Alert,
Button,
Form,
Input,
InputNumber,
Select,
DatePicker
} from 'antd';
import React,{useState,useEffect} from 'react';
import {paisesFinal,provinciasFinal,departamentosFinal,puestosFinal} from '../../Data/CountriesData'
import { message } from 'antd';
import {connect} from 'react-redux'
import rrhhApi from '../../apis/rrhhApi';
import Api from '../../apis/rrhhApi'
import { BUSCAR_CANDIDATO_ACTION,CAMBIAR_ESTADO,GET_PUESTOS_ACTION } from '../../actions';
import handleError from '../../Data/errorHandle';
import moment from 'moment';
import { tuple } from 'antd/es/_util/type';
const { Option } = Select;


const App = (props) => {

  const [dateInput,dateInputSet] = useState(true)
  const [hideInputHour,hideInputHourSet] = useState(true) 

  const [form] = Form.useForm();

  const onSelectChangeHour = (e) =>{
    console.log(e)
    if(e === 'Por Hora'){
      hideInputHourSet(false)
    }else{
      hideInputHourSet(true)
    }
  }

  useEffect(() => {
    form.setFieldsValue({
      nombre:props.candidatoSelecionado?.nombre,
      apellido:props.candidatoSelecionado?.apellido,
      cedula:props.candidatoSelecionado?.cedula,
      celular:props.candidatoSelecionado?.celular,
      correo:props.candidatoSelecionado?.correo,
      pais:props.candidatoSelecionado?.pais,
      provincia:props.candidatoSelecionado?.provincia,
      direccion:props.candidatoSelecionado?.direccion,
      puesto:props.candidatoSelecionado?.puestoAplicado,
      sexo:props.candidatoSelecionado?.sexo,
      fechaDeNacimiento:moment(props.candidatoSelecionado?.fechaDeNacimiento),

    })    
  },[props.candidatoSelecionado]);

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
      const data = await rrhhApi.post('empleados',{
        nombre:values.nombre,
        apellido:values.apellido,
        correo:values.correo,
        celular:values.celular,
        cedula:values.cedula,
        provincia:values.provincia,
        password:values.password,
        confirmPassword:values.confirmPassword,
        pais:values.pais,
        puestoAplicado:values.puestoAplicado,
        direccion:values.direccion,
        entrevistado:values.entrevistado,
        estadoLaboral:values.estadoLaboral,
        puestoAplicado:values.puesto,
        departamento:values.departamento,
        sexo:values.sexo,
        tipoDeNomina:values.tipoDeNomina,
        costoPorHora:values.costoPorHora,
        sueldoFijo:values.salario,
        fechaDeNacimiento:values.fechaDeNacimiento,
        createdAt:values.createdAt
      })
      props.CAMBIAR_ESTADO(!props.estado)
      message.success('Creado con Exito')
    }catch(err){
      handleError(err)
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

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
  const renderDepartamentos = (provincas) =>{
    return provincas.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }
  return (
    <Form
      name="basic" labelCol={{span: 8,}} wrapperCol={{span: 8, }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size='small'
      form={form}
    >
      <Form.Item 
          name="nombre" 
          label="Nombre"
          rules={[{required: true,message: 'Tienes que introducir el nombre del empleado',},]}>
          <Input />
      </Form.Item>
        <Form.Item
          name="apellido" label="Apellido" rules={[{required: true,message: 'Tienes que introducir el apellido del empleado',},
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="correo"
          label="Correo"
          rules={[
            {
              type: 'email',
              message: 'Introduce un verdadero correo',
            },
            {
              required: true,
              message: 'Introduce un correo',
            },
          ]}
        >
          <Input />
        </Form.Item>

      <Form.Item
          name="cedula"
          label="Cedula"
          tooltip="Dcumento de identificacion del empleado"
          rules={[
            {
              required: true,
              message: 'Please input your nickname!'
            },
          ]}
        >
          <Input/>
        </Form.Item>
  
        <Form.Item
          name="celular"
          label="Numero de Telefono"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input/>
        </Form.Item>

        <Form.Item
          name="direccion"
          label="Direccion"
          rules={[
            {
              required: true,
              message: 'Please input Intro',
            },
          ]}
        >
          <Input.TextArea showCount maxLength={100} />
        </Form.Item>

        <Form.Item
          name="sexo"
          label="Genero"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="Seleciona tu genero">
            <Option value="Hombre">Hombre</Option>
            <Option value="Mujer">Mujer</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="fechaDeNacimiento"
          label="Fecha de Nacimiento"
          rules={[
            {
              required: true,
              message: 'Necesita intruducir su fecha de nacimiento',
            },
          ]}
        >
        <DatePicker />
        </Form.Item>
      
     
        <Form.Item
          name="pais"
          label="Pais"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
        <Select placeholder="Seleciona el pais">
            {renderPaises(paisesFinal)}
        </Select>
        </Form.Item>
        <Form.Item
          name="provincia"
          label="Provincia"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
        <Select placeholder="Seleciona el pais">
            {renderProvincias(provinciasFinal)}
        </Select>
        </Form.Item>

        
        <Form.Item
          name="password"
          label="Contraseña"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
            {
              min: 8,
              message: 'La contraseña debe tener almenos 8 caracteres',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
  
        <Form.Item
          name="confirmPassword"
          label="Confirmar Contraseña"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
  
                return Promise.reject(new Error('The two passwords that you entered do not match!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="salario"
          label="Salario"
          rules={[
            {
              required: true,
              message: 'Please input donation amount!',
            },
          ]}
        >
          <InputNumber
            style={{
              width: '100%',
            }}
          />
        </Form.Item>

        <Form.Item
          name="contrato"
          label="Contrato"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="Seleciona el tipo de contrato" onChange={(e)=>{
            if(e === 'definido'){
              dateInputSet(false)
            }else if(e === 'indefinido'){
              dateInputSet(true)
            }else if(e === 'temporal'){
              dateInputSet(false)
            }
          }}>
            <Option value="definido">Definido</Option>
            <Option value="indefinido">Indefinido</Option>
            <Option value="temporal">Temporal</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="vencimientoDelContrato"
          label="Expiración de contrato"
        >
        <DatePicker disabled={dateInput} />
        </Form.Item>
        <Form.Item
          name="tipoDeNomina"
          label="Tipo de Nomina"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="Seleciona el tipo de nomina" onChange={(e) => onSelectChangeHour(e)} >
            <Option value="Nomina Fija">Nomina Fija</Option>
            <Option value="Por Hora">Por Hora</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="costoPorHora"
          label="Costo de Hora"
          hidden={hideInputHour}
        >
          <InputNumber
            style={{
              width: '100%',
            }}
          />
        </Form.Item>
        <Form.Item
          name="departamento"
          label="Departamento"
          rules={[
            {
              required: true,
              message: 'Please select gender!',
            },
          ]}
        >
          <Select placeholder="Seleciona el tipo de Departamento">
               {renderDepartamentos(departamentosFinal)}
          </Select>
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
          <Select placeholder="Seleciona el puesto">
               {renderDepartamentos(puestosFinalArray)}
          </Select>
        </Form.Item>

        <Form.Item name="createdAt" label="Inicio Laboral">
          <DatePicker/>
        </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Convertir en Empleado
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = state =>{
  return {
          estado:state.cambiarState,
          candidatoSelecionado:state.candidatoSelecionado.candidatoSelec,
          puestos:state.puestos.puestos
    }
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION
})(App);

