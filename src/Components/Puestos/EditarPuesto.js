import React, { useEffect } from "react";
import { Button, Form, Input, message, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const { TextArea } = Input;

const CrearPermiso = (props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.puesto?.nombre,
      descripcion: props.puesto?.descripcion,
    });
  }, [props.puestoSelecionado]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      await Api.patch(`/puestos/${props.puesto._id}`, {
        nombre: values.nombre,
        descripcion: values.descripcion,
      });
      form.resetFields();
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Permiso Editado con exito", 3);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Form
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
      form={form}
    >
      <Form.Item
        label="Nombre del Puesto"
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Puesto
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    puestoSelecionado: state.puestoSelecionado.puestoSelecionado,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
