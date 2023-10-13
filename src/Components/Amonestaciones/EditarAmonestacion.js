import React, { useEffect } from "react";
import moment from "moment";
import { Button, Form, Input, message } from "antd";
import { validateAllNumbers } from "../Utils/Validators";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const EditarPermiso = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      cantidadamonestacion: props.amonestacion?.cantidadAmonestacion,
      nombreamonestacion: props.amonestacion?.nombre,
    });
  }, [form, props.amonestacion]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`amonestaciones/${props.amonestacion?.key}`, {
        nombreAmonestacion: values.nombreamonestacion,
        cantidadAmonestacion: values.cantidadamonestacion,
      });
      props.onClose();
      props.onCLoseParent();
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Amonestación Actualizada con exito", 3);
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
        name="nombreamonestacion"
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
        label="Cantidad de la Amonestación"
        name="cantidadamonestacion"
        rules={[
          {
            required: true,
            message: "Por favor introduce la cantidad del beneficio",
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
          Editar Amonestación
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
})(EditarPermiso);
