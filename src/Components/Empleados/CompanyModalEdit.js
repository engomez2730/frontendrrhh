import React,{useEffect,useState} from 'react';
import { Button,  Form, Input,Select,DatePicker } from 'antd';
import {departamentosFinal} from '../../Data/CountriesData'
import { Switch } from 'antd';
import { editarUsuario, CAMBIAR_ESTADO } from '../../actions';
import {connect} from 'react-redux'
import Api from '../../apis/rrhhApi'
import { message } from 'antd';
import cambiarState from '../../reducers/cambiarEstadoReducer';
import handleError from '../../Data/errorHandle';
const { Option } = Select;


const CompanyModalEdit = (props) => {

    const [form] = Form.useForm()
    const [errorAlert,errorAlertSet] = useState('')
    const [dateInput,dateInputSet] = useState(true)
    const [checkedInput,setChecked] = useState(false)

    const renderDepartamentos = (provincas) =>{
        return provincas.map((e) =>{
            return <Option value={`${e.label}`} key={e.label}>{e.label}</Option> 
        })
    }

 
    useEffect(() => {
        form.setFieldsValue({
          sueldoFijo:props.usuarioEditar.sueldoFijo,
          contrato:props.usuarioEditar.contrato,
          departamento:props.usuarioEditar.departamento,
          expiracionDelContrato:props.usuarioEditar.expiracionDelContrato,
          vacacionesTomadas:props.usuarioEditar.vacacionesTomadas
      })

    }, [props.usuarioEditar]);

    const onFinish = async (values) => {
        console.log('Success:', values);
        try{
          const data = await Api.patch(`empleados/${props.usuarioEditar.key}`,{
            sueldoFijo:values.sueldoFijo,
            contrato:values.contrato,
            departamento:values.departamento,
            celular:values.celular,
            expiracionDelContrato:values.expiracionDelContrato,
            vacacionesTomadas:values.vacacionesTomadas,
          })          
          props.CAMBIAR_ESTADO(!props.estado)
          message.success('Empleado Actualizado', 2);
          }catch(err){
            handleError(err)
        }
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      return (
        <div>
             <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      form={form}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Sueldo Fijo" name="sueldoFijo"
        rules={[
          {
            required: true,
            message: 'Introduce un sueldo fijo',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="contrato" label="Contrato"
        rules={[
            {
              required: true,
              message: 'Introduce un contrato',
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
            <Option value="definido">definido</Option>
            <Option value="indefinido">indefinido</Option>
            <Option value="temporal">temporal</Option>
          </Select>
        </Form.Item>
        <Form.Item name="expiracionDelContrato" label="Expiración de contrato">
        <DatePicker disabled={dateInput} />
        </Form.Item>
        <Form.Item name="departamento" label="Departamento" rules={[ {required: true, message: 'Please select gender!',},]}>
          <Select placeholder="Seleciona el tipo de Departamento">
               {renderDepartamentos(departamentosFinal)}
          </Select>
        </Form.Item>
      <Form.Item wrapperCol={{offset: 8,span: 16,}}>
        <Button type="primary" htmlType="submit">
          Actualizar
        </Button>
      </Form.Item>
    </Form>
    {errorAlert}
        </div>
    );
}

const stateMapToProps = (state) =>{
    return {usuarioEditar:state.usuarioEditarSelecionado, usuarioFinal:state.usuarioEditadoFinal, estado:state.cambiarState}
}

export default connect(stateMapToProps,{
  editarUsuario,
  CAMBIAR_ESTADO
})(CompanyModalEdit);
