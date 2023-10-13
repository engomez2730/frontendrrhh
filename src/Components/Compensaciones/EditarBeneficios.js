import React, { useEffect } from "react";
import moment from "moment";
import { Button, Form, Input, message, Select } from "antd";
import { validateMinLength, validateAllNumbers } from "../Utils/Validators";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";

const EditarPermiso = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      cantidadBeneficio: props.beneficio?.cantidadBeneficio,
      nombreBeneficio: props.beneficio?.nombre,
    });
  }, [form, props.beneficio]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`beneficios/${props.beneficio?.key}`, {
        cantidadBeneficio: values.cantidadBeneficio,
        nombreBeneficio: values.nombreBeneficio,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Beneficio Actualizado con exito", 3);
      props.onCLose();
      props.onCLoseParent();
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
          Editar Beneficio
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
