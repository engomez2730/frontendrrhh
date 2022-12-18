import React,{useState,useEffect} from 'react';
import './Vacaciones.css'
import {connect} from 'react-redux'
import { Button,  Form, DatePicker,Switch,message } from 'antd';
import { CAMBIAR_ESTADO } from '../../actions';
import Api from '../../apis/rrhhApi'
import handleError from '../../Data/errorHandle';
import {vacaciones} from '../../Data/Calcular'

const { RangePicker } = DatePicker;



const EditarVacaciones = (props) => {





  const [determineCheck,determineCheckSet] = useState(props.usuarioSelecionado?.vacacionesTomadas)
  const [checkedInput,setChecked] = useState(false)
  const [form] = Form.useForm()

  useEffect(()=>{
    form.setFieldsValue({
      vacacionesTomadas:props.usuario?.vacacionesTomadas,
      tiempoDeVacaciones:props.usuario?.tiempoDeVacaciones
  })
  },[props.usuarioSelecionado])
    const onChange = (checked) => {
        setChecked(checked)
        determineCheckSet(checked)
      };

      const mostrarDisponibilidad = (date) =>{
        const actualYear = new Date()
        if(new Date(date).getFullYear() === actualYear.getFullYear()){
          return 'Si'
        }else{
          return 'NO'
        } 
      }      


      const mostrarFecha = date =>{
        if(date === undefined){
            return 'No le han establecido fecha aun'
        }
        const meses= ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
        let newDate = new Date(date)
        return `${newDate.getDate()} de ${meses[newDate.getMonth()]} del ${newDate.getFullYear()} `
       }
    const rangeConfig = {
        rules: [
          {
            type: 'array'
          },
        ],
      };

    const onFinish = async (values)  => {

      try{
        const response = await Api.post(`vacaciones/`,{
          tiempoDeVacaciones:values.tiempoDeVacaciones,
          key:props.usuarioSelecionado._id
        })
        props.CAMBIAR_ESTADO(!props.cambiarState)
        message.success('Vacaciones actualziadas',2);
       }catch(err){
        handleError(err)
      }
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
      
    return (
        <div className='editrarVacacionesForm'>
        <Form name="basic" labelCol={{span: 8,}} wrapperCol={{span: 16,}} initialValues={{remember: true,}}onFinish={onFinish}onFinishFailed={onFinishFailed}autoComplete="off" >
     <h1>Ya tomo sus vacaciones establecidas esta año? <span className='vacacionesSpan'>{mostrarDisponibilidad(props.usuario?.Vacaciones[props.usuario.Vacaciones.length-1]?.tiempoDeVacaciones[0])}</span></h1>
     <h1>Dias de vacaciones que le tocan: <span className='vacacionesSpan'>{vacaciones(props?.usuario?.createdAt)}</span></h1>
     <h1>Proxima disponibilidad de vacaciones: <span className='vacacionesSpan'>{mostrarFecha(props.usuario?.Vacaciones[props.usuario.Vacaciones.length-1]?.siguientesVacacionesFecha)}</span></h1>
     <Form.Item name="tiempoDeVacaciones" label="Tiempo de Vacaciones"  {...rangeConfig}>
        <RangePicker /* disabled={!props.usuario?.vacacionesDisponibles} */ />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Form.Item label="Vacaciones Tomadas" name='vacacionesTomadas' wrapperCol={{offset: 8,span: 16,}}>
        <Switch checked={determineCheck} onChange={onChange} />
      </Form.Item>
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
