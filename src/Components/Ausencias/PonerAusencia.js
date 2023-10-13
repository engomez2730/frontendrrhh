import React from "react";
import { Button, DatePicker, Form, Input, message } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const CrearPermiso = (props) => {
  const [form] = Form.useForm();
  console.log(props.empleado);
  const onFinish = async (values) => {
    console.log(props);
    try {
      await Api.patch(`empleados/ausencias/${props.empleado?.id}`, {
        razon: values.razon,
        fecha: values.fechaAusencia,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      props.onClose();
      message.success("Ausencia establecida con exitos", 3);
      form.resetFields();
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
        label="Razón Ausencia"
        name="razon"
        rules={[
          {
            required: true,
            message: "Por Favor introduce el nombre de la amonestación",
          },
        ]}
      >
        <Input style={{ width: "150px" }} />
      </Form.Item>
      <Form.Item
        label="Fecha de Ausencia"
        name="fechaAusencia"
        rules={[
          {
            required: true,
            message: "Por favor introduce la cantidad de la amonestación",
          },
        ]}
      >
        <DatePicker style={{ width: "150px" }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Agregar Amonestación
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    usuarioSelecionado: state.usuarioSelecionadoVer?.usuarioSelecionadoVer,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
