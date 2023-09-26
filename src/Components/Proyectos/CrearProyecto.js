import React from "react";
import { Button, Form, Input, message, Select } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import { useSelector } from "react-redux";
const { Option } = Select;

const { TextArea } = Input;

const CrearPermiso = (props) => {
  const [form] = Form.useForm();
  const estado = useSelector((state) => state?.cambiarState);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await Api.post(`proyectos`, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        encargado: values.encargado,
      });
      form.resetFields();
      props.CAMBIAR_ESTADO(!estado);
      message.success("Equipo Creado con exito", 3);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      form={form}
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
        label="Nombre del Proyecto"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce un Nombre para el Proyecto",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Encargado del Proyecto"
        name="encargado"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce un Nombre para el Proyecto",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Descripcion"
        name="descripcion"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce una descripcion",
          },
        ]}
      >
        <TextArea showCount maxLength={100} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Equipo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect(null, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
