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
    console.log("Success:", values);
    console.log(props);
    try {
      await Api.post(`amonestaciones`, {
        nombreAmonestacion: values.nombreAmonestacion,
        cantidadAmonestacion: values.cantidadAmonestacion,
        key: props?.usuarioSelecionado._id,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Amonestacion Creada con exitos", 3);
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
        label="Nombre de la amonestación"
        name="nombreAmonestacion"
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
        label="Cantidad de la amonestación"
        name="cantidadAmonestacion"
        rules={[
          {
            required: true,
            message: "Por favor introduce la cantidad de la amonestación",
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
