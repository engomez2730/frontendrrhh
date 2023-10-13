import React from "react";
import moment from "moment";
import { Button, Form, Input, message, Select } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import { useForm } from "antd/lib/form/Form";

const validateMinLength = (minLength) => (rule, value, callback) => {
  if (value && value.length < minLength) {
    callback(`Necesita tener al menos ${minLength} `);
  } else {
    callback();
  }
};

const validateAllNumbers = (rule, value, callback) => {
  const regex = /^\d+$/;
  if (!regex.test(value)) {
    callback("Debe ser solo numeros");
  } else {
    callback();
  }
};

const CrearPermiso = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await Api.post(`beneficios`, {
        cantidadBeneficio: values.cantidadBeneficio,
        nombreBeneficio: values.nombreBeneficio,
        key: props?.usuarioSelecionado._id,
        historial: {
          accion: "Beneficio",
          fecha: new Date(),
          color: "#43cea2",
        },
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Beneficio Creado con exito", 3);
      form.resetFields();
      props.onClose();
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
        label="Nombre del Beneficio"
        name="nombreBeneficio"
        rules={[
          {
            required: true,
            message: "Por Favor introduce el nombre del beneficio",
          },
        ]}
      >
        <Input style={{ width: "150px" }} />
      </Form.Item>
      <Form.Item
        label="Cantidad del beneficio"
        name="cantidadBeneficio"
        rules={[
          {
            required: true,
            message: "Por favor introduce la cantidad del beneficio",
          },
          {
            validator: validateMinLength(1),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input style={{ width: "150px" }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Agregar Beneficio
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
