import React,{useState,useEffect} from 'react';
import './Vacaciones.css'
import {connect} from 'react-redux'
import { Button,  Form, DatePicker,message, InputNumber  } from 'antd';
import { CAMBIAR_ESTADO } from '../../actions';
import Api from '../../apis/rrhhApi'
import handleError from '../../Data/errorHandle';
import {vacaciones} from '../../Data/Calcular'
import moment from 'moment';
import bussinesMoment from 'moment-business-days'

const { RangePicker } = DatePicker;



const EditarVacaciones = (props) => {

  const [form] = Form.useForm()
    useEffect(()=>{
      form.setFieldsValue({
        vacacionesTomadas:props.usuario?.vacacionesTomadas,
        tiempoDeVacaciones:props.usuario?.tiempoDeVacaciones,
      })
    },[props.usuarioSelecionado])

 
      const mostrarFecha = date =>{
          if(date === undefined){
              return 'No le han establecido fecha aun'
          }
          const meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
          let newDate = new Date(date)
          return `${newDate.getDate()} de ${meses[newDate.getMonth()]} del ${newDate.getFullYear()} `
      }

    const rangeConfig = {rules: [{type: 'array'},],};

    const onFinish = async (values)  => {
          try{
                await Api.post(`vacaciones/`,{
                  tiempoDeVacaciones:values.tiempoDeVacaciones,
                  diasDeVacaciones:values.diasDeVacaciones,
                  key:props.usuarioSelecionado._id
                })
                props.CAMBIAR_ESTADO(!props.cambiarState)
                message.success('Vacaciones Actualizadas',2);
          }catch(err){
                handleError(err)
          }
    };
  
    return (
      <div className='editrarVacacionesForm'>
          <Form name="basic" 
          labelCol={{span: 8,}} 
          wrapperCol={{span: 16,}} 
          initialValues={{remember: true,}}
          onFinish={onFinish}
          autoComplete="off"
          >
              <h1>Dias de vacaciones que le tocan: <span className='vacacionesSpan'>{vacaciones(props?.usuario?.createdAt)}</span></h1>
              <h1>Proxima disponibilidad de vacaciones: <span className='vacacionesSpan'>{mostrarFecha(props.usuario?.Vacaciones[props.usuario.Vacaciones.length-1]?.siguientesVacacionesFecha)}</span></h1>
              <Form.Item name="diasDeVacaciones" label="Dias de Vacaciones">
                  <InputNumber />
              </Form.Item>
              <Form.Item name="tiempoDeVacaciones" label="Tiempo de Vacaciones"  {...rangeConfig}>
                  <RangePicker/>
              </Form.Item>
              <Form.Item wrapperCol={{offset: 8,span: 16,}}>
                  <Button type="primary" htmlType="submit">
                    Establecer Vacaciones
                  </Button>
              </Form.Item>
          </Form>
      </div>
    );  
}

const stateMapToProps =(state) =>{
  return {cambiarState:state.cambiarState, usuarioSelecionado:state.usuarioSelecionadoVer.usuarioSelecionadoVer}
}

export default connect(stateMapToProps,{
  CAMBIAR_ESTADO
})(EditarVacaciones);
