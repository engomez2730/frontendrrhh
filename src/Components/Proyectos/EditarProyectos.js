import React, { useEffect } from "react";
import { Button, Form, Input, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const { TextArea } = Input;

const EditarEquipo = (props) => {
  const [form] = useForm();

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.equipo?.nombre,
      descripcion: props.equipo?.descripcion,
      encargado: props.equipo?.encargado,
    });
  }, [props.equipo]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`/proyectos/${props?.equipo._id}`, {
        nombre: values.nombre,
        descripcion: values.descripcion,
        encargado: values.encargado,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Proyectos Editado con exito", 3);
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
        label="Encargado"
        name="encargado"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce una descripcion",
          },
        ]}
      >
        <Input showCount maxLength={100} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Proyecto
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
})(EditarEquipo);
