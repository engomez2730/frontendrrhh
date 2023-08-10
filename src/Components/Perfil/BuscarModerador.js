import { Button, Checkbox, Form, Input, message, Modal } from "antd";
import { connect } from "react-redux";
import { BUSCADOR_EMPLEADOS_GET } from "../../actions";
import rrhhApi from "../../apis/rrhhApi";
import handleError from "../../Data/errorHandle";
import { useState } from "react";
import TableMini from "./TableMiniPerfil.js";
/* import TableMini from "./TableMini.js";
 */
const App = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values) => {
    try {
      const response = await rrhhApi.get(
        `empleados/buscar?query=${values.nombre}`
      );

      setData(response.data.empleados.Empleados);

      if (!response.data.empleados.Empleados) {
        return message.error("No se encontraron empleados con esta cedula", 3);
      }

      showModal();
    } catch (err) {
      message.error("Error, Asegurate de introducir numeros enteros", 3);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 3 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre del empleado"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Tienes que introducir el numero de cedula!",
            },
          ]}
        >
          <Input />
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
      <Modal
        title="Emplados encontrados"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {<TableMini empleados={data} onCancel={handleCancel} />}
      </Modal>
    </div>
  );
};
export default connect(null, {
  BUSCADOR_EMPLEADOS_GET,
})(App);
