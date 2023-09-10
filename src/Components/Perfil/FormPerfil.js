import React, { useEffect } from "react";
import { Button, Form, Input, DatePicker, message, Select } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO, setUser } from "../../actions";
import handleError from "../../Data/errorHandle";

const Perfil = (props) => {
  const [form] = Form.useForm();
  console.log(props.usuario);

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.usuario?.nombre,
      correo: props.usuario?.correo,
      password: props.usuario?.password,
    });
  }, [props.usuario]);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const crearPermiso = await Api.patch(`empleados/${props.usuario?._id}`, {
        nombre: values.nombre,
        correo: values.correo,
      });
      localStorage.setItem("user", JSON.stringify(crearPermiso.data.data.data));
      props.setUser(crearPermiso.data.data.data);
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Usuario editado", 3);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Form
      className="finalForm"
      form={form}
      name="basic"
      size="large"
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
        label="Nombre"
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
        label="Correo"
        name="correo"
        rules={[
          {
            required: true,
            message: "Correo",
          },
        ]}
      >
        <Input />
      </Form.Item>
      {/* <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Correo",
          },
        ]}
      >
        <Input />
      </Form.Item> */}
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Mi Usuario
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    usuario: state.user.user,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
  setUser,
})(Perfil);
