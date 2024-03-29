import React, { useState } from "react";
import { Button, Form, Input, DatePicker, message } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO, usuarioEditarSeleciondo } from "../../actions";
import handleError from "../../Data/errorHandle";

const { TextArea } = Input;

const CrearPermiso = (props) => {
  const [usuarioSelec, usuarioSelecSet] = useState([]);
  const [form] = Form.useForm();

  console.log(props);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await Api.post(`permisos`, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha: values.fecha,
        empleado: props.usuario._id,
        historial: {
          accion: "Permiso",
          fecha: new Date(),
          color: "#2c3e50",
        },
      });
      form.resetFields();
      props.CAMBIAR_ESTADO(!props.estado);
      props.onCLose();
      message.success("Permiso Creado con exito", 3);
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
        label="Nombre del Permiso"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce un Nombre",
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
        label="Fecha"
        name="fecha"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce una fecha",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Permiso
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    permisos: state.permisos.permisos,
    permisoSelecioandoData: state.permisoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
