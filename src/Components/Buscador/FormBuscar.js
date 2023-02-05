import { Button, Checkbox, Form, Input,message  } from 'antd';
import {connect} from 'react-redux'
import {BUSCADOR_EMPLEADOS_GET} from '../../actions'
import rrhhApi from '../../apis/rrhhApi';
import handleError from '../../Data/errorHandle';

const App = (props) => {
  const onFinish = async (values) => {
    try{
      const response = await rrhhApi.get(`empleados?cedula=${values.cedula}`)
      if(!response.data.empleados.Empleados[0]){
        message.error('No se encontraron empleados con esta cedula',3)
      }
      props.BUSCADOR_EMPLEADOS_GET(response.data.empleados.Empleados[0])
    }catch(err){
      message.error('Error, Asegurate de introducir numeros enteros',3)
    }

  };
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic" labelCol={{span: 8,}} wrapperCol={{span: 3,}} onFinish={onFinish} onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item label="Cedula" name="cedula" rules={[
            {
              required: true,
              message: 'Tienes que introducir el numero de cedula!',
            },
          ]}>
        <Input/>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Buscar
        </Button>
      </Form.Item>
    </Form>
  );
};
export default connect(null,{
  BUSCADOR_EMPLEADOS_GET
})(App);