import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space, message } from 'antd';
import {connect} from 'react-redux'
import { CAMBIAR_ESTADO } from '../../actions';
import handleError from '../../Data/errorHandle';
import rrhhApi from '../../apis/rrhhApi';





const App = (props) => {

  const onFinish = async (values)  => {
    try{
      const response = await rrhhApi.patch(`empleados/beneficios/${props?.usuario?._id}`,{
        Beneficios:values.beneficios,
      }) 
      props.CAMBIAR_ESTADO(!props.estado)
      message.success('Beneficios Agregados con exito',3) 
    }catch(err){
      handleError(err)
    }
  }


   return (
   <Form
    name="dynamic_form_nest_item"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    autoComplete="off"
  >
    <Form.List name="beneficios">
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name, ...restField }) => (
            <Space
              key={key}
              style={{
                display: 'flex',
                marginBottom: 8,
              }}
              align="baseline"
            >
              <Form.Item
                {...restField}
                name={[name, 'nombre']}
                rules={[
                  {
                    required: true,
                    message: 'Tienes que poner un nombre',
                  },
                ]}
              >
                <Input placeholder="Nombre Beneficio" />
              </Form.Item>
              <Form.Item
                {...restField}
                name={[name, 'cantidad']}
                rules={[
                  {
                    required: true,
                    message: 'Tienes que poner una cantidad',
                  },
                ]}
              >
                <Input placeholder="Cantidad" />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(name)} />
            </Space>
          ))}
          <Form.Item>
            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
              Añadir Beneficio
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
    <Form.Item>
      <Button type="primary" htmlType="submit">
        Agregar Beneficios
      </Button>
    </Form.Item>
  </Form>)
};


const StateMapToProps = state =>{
  return {
          empleados:state.empleados.empleados, 
          estado:state.cambiarState, 
          anuncioSelecionado:state.AvisoSelecionado.avisoSelecionado}
         }


export default connect(StateMapToProps,{
  CAMBIAR_ESTADO
})(App);