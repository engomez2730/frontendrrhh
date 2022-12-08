import React,{useEffect,useState} from 'react';
import { Button, Form, message,Select, InputNumber } from 'antd';
import Api from '../../apis/rrhhApi'
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';

const {Option} = Select;


const CrearPermiso = (props) => {

  const [disableForm,setDisableForm] = useState(false)

  const nominaOpciones = props.nominasCompletas?.map(e =>{
        return e.nombreNomina
  })
  const renderOpciones = (Countries) =>{
    return Countries.map((e,index) =>{
        return <Option value={`${e}`} key={index}>{e}</Option> 
    })
  }
  const [form] = Form.useForm();

  useEffect(() => {

    form.setFieldsValue({
      nombreNomina:props.nominaCompletaSelect?.nombreNomina,
      horasMensualesTrabajadas:0
    })
    const item = props?.usuarioSelecionado?.Nominas.find(e =>{
      return e.nombreNomina ===  props.nominaCompletaSelect.nombreNomina
    })
    if(props?.usuarioSelecionado?.Nominas.length === 0 || item?.nombreNomina !== props.nominaCompletaSelect.nombreNomina){
      setDisableForm(false)
    }else{
      setDisableForm(true)
    }
  },[props?.usuarioSelecionado]);


  const onFinish = async(values) => {
    console.log(values)
    try{
        await Api.post('nomina',{
            sueldoFijo:props.usuarioSelecionado?.sueldoFijo,
            Empleados:props.usuarioSelecionado?._id,
            tipoDeNomina:props.usuarioSelecionado?.tipoDeNomina,
            costoPorHora:props.usuarioSelecionado?.costoPorHora,
            horasMensualesTrabajadas:values.horasMensualesTrabajadas || 0,
            horasExtras:values.horasExtras,
            horasDobles:values.horasDobles,
            nombreNomina:values.nombreNomina,
            descuentos:values.descuentos,
            bonus:values.bonus,
          })
        props.CAMBIAR_ESTADO(!props.estado)
        message.success('Nomina Agregada',3)
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
      labelCol={{span: 8,}}
      wrapperCol={{ span: 8,}}
      initialValues={{remember: true,}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      disabled={disableForm}
      form={form}
    >
      <Form.Item
        label="Mes de la Nomina"
        name="nombreNomina"
        rules={[
          {
            required: true,
            message: 'Por Favor Introduce un Nombre',
          },
        ]}
      >
        <Select>
        <Option value={`${props.nominaCompletaSelect?.nombreNomina}`} 
                key={props.nominaCompletaSelect?.nombreNomina}>{props.nominaCompletaSelect?.nombreNomina}</Option> 
        </Select>
      </Form.Item>

      <Form.Item 
      label="Total Horas Trabajadas" 
      name="horasMensualesTrabajadas"
      rules={[
        {
          required: true,
          message: 'Please input your nickname!'
        },
      ]}
      hidden={props.usuarioSelecionado?.tipoDeNomina === 'Por Hora' ? false : true }>
     
        <InputNumber/>
      </Form.Item>
      <Form.Item 
          label="Total Horas Extras" 
          name="horasExtras" 
          hidden={props.usuarioSelecionado?.tipoDeNomina === 'Por Hora' ? false : true }>
        <InputNumber/>
      </Form.Item>
      <Form.Item 
        label="Total Horas Dobles" 
        name="horasDobles"
        hidden={props.usuarioSelecionado?.tipoDeNomina === 'Por Hora' ? false : true }

        >
        <InputNumber/>
      </Form.Item>

      <Form.Item 
        label="Total Descuentos" name="descuentos">
        <InputNumber />
      </Form.Item>
      <Form.Item 
        label="Total Bonus" name="bonus">
        <InputNumber />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Agregar a Nomina
        </Button>
      </Form.Item>
    </Form>
  );
};



const StateMapToProps = state =>{
  return {
    nominasCompletas:state.nominasCompletas.nominasCompletas,
    estado:state.cambiarState,
    usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer,
    nominaCompletaSelect:state.nominaCompletaSelect.nominaCompletaSelect

}
}

export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(CrearPermiso);