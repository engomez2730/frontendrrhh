import React, { useState, useEffect } from "react";
import { Button, Form, Input, DatePicker, message } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
const { TextArea } = Input;

const CrearPermiso = (props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.departamento?.nombre,
      encargado: props.departamento?.encargado,
      descripcion: props.departamento?.descripcion,
    });
  }, [props?.departamento]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`departamentos/${props?.departamento?.key}`, {
        nombre: values.nombre,
        encargado: values.encargado,
        descripcion: values.descripcion,
      });
      props?.CAMBIAR_ESTADO(!props?.estado);
      message.success("Departamento actualizado con exito", 3);
    } catch (err) {
      console.log(err.response.data.message);
      message.error(err.response.data.message, 3);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
      name="basic"
      form={form}
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
        label="Nombre del departamento"
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
        label="Encargado del departamento"
        name="encargado"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce un encargado",
          },
        ]}
      >
        <TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item label="Descripcion del Departamento" name="descripcion">
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Departamento
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    anuncios: state.AvisoSelecionado?.avisoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
