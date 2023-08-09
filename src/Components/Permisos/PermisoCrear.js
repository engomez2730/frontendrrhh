import React, { useState } from "react";
import { Button, Form, Input, DatePicker, message } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const { TextArea } = Input;

const CrearPermiso = (props) => {
  const [usuarioSelec, usuarioSelecSet] = useState([]);
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const usuarioPer = await Api.get(
        `permisos/verempleados?cedula=${values.Empleado}`
      );
      usuarioSelecSet(usuarioPer.data.empleados[0]);
      await Api.post(`permisos`, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        fecha: values.fecha,
        empleado: usuarioPer.data.empleados[0]._id,
      });

      form.resetFields();

      props.CAMBIAR_ESTADO(!props.estado);
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
        label="Cedula del empleado:"
        name="Empleado"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce la cedula del empleado",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="USUARIO SELECIONADO">
        {`${usuarioSelec?.nombre || ""} ${usuarioSelec?.apellido || ""}`}
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
