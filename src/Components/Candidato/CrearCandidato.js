import { Button, Checkbox, Form, Input,Select,message,DatePicker  } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import React,{useEffect,useState} from 'react';
import rrhhApi from '../../apis/rrhhApi';
import { BUSCAR_SOLICITANTE_ACTION, CAMBIAR_ESTADO } from '../../actions';
import {connect} from 'react-redux'
import {paisesFinal,provinciasFinal,departamentosFinal,puestosFinal,estadoCandidatoFinal} from '../../Data/CountriesData'
import handleError from '../../Data/errorHandle';
const { Option } = Select;



const App = (props) => {

  const [form] = Form.useForm()
  const [vacantes,setVacantes] = useState([])

  const getVacantes = async () =>{
    const vacantes = await rrhhApi.get('vacantes')
    setVacantes(vacantes.data.data?.Vacantes.map(e => e.nombre))
  }
 
  useEffect(()=>{
    getVacantes()
    form.setFieldsValue({
      nombre:props.solicitante?.nombre,
      apellido:props.solicitante?.apellido,
      cedula:props.solicitante?.cedula,
      celular:props.solicitante?.celular,
      correo:props.solicitante?.correo,
      pais:props.solicitante?.pais,
      provincia:props.solicitante?.provincia,
      puestoAplicado:props.solicitante?.puesto,
    },[props.solicitante])

    return () =>{
      props.BUSCAR_SOLICITANTE_ACTION()
    }
  },[props.estado])

  const onFinish = async(values) => {
    try{
      const data = await rrhhApi.post('entrevistados',{
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
        estadoLaboral:values.estadoLaboral,
        vacanteAplicada:values.vacanteAplicada,
        sexo:values.sexo
      })

      props.CAMBIAR_ESTADO(!props.estado)
      message.success('Candidato creado con exito')

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

  const renderPaises = (Countries) =>{
    return Countries?.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }

  const renderProvincias = (provincas) =>{
    return provincas?.map((e) =>{
        return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
    })
  }
  const renderVacantes = (provincas) =>{
    return provincas?.map((e,index) =>{
        return <Option value={`${e}`} key={index}>{e}</Option> 
    })
  }
  return (
    <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 32,}} initialValues={{ remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{width:'500px' }}
      form={form}
      size='small'
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
      >
          <Select placeholder="Seleciona la provincia">
               {renderProvincias(provinciasFinal)}
          </Select>
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
        <Select placeholder="Seleciona el estado laboral">
               {renderProvincias(estadoCandidatoFinal)}
          </Select>
      </Form.Item>

      <Form.Item
        label="Vacante Aplicada"
        name="vacanteAplicada"
        rules={[{required: true,message: 'Please input your password!',},]}
      >
        <Select placeholder="Seleciona el estado laboral">
               {renderVacantes(vacantes)}
          </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) =>{
  return {estado:state.cambiarState, solicitante:state.buscarSolicitante.buscarSolicitante}
}

export default connect(StateMapToProps,{
  BUSCAR_SOLICITANTE_ACTION,CAMBIAR_ESTADO
})(App);