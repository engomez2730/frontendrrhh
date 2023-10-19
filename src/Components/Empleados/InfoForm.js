import React, { useEffect } from "react";
import { Button, DatePicker, Form, Input } from "antd";
import { connect } from "react-redux";
import Api from "../../apis/rrhhApi";
import { message } from "antd";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import moment from "moment";
import {
  validateAge,
  validateAllNumbers,
  validateMinLength,
} from "../Utils/Validators";

const InfoForm = (props) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.usuarioEditar.nombre,
      apellido: props.usuarioEditar.apellido,
      correo: props.usuarioEditar.correo,
      celular: props.usuarioEditar.celular,
      cedula: props.usuarioEditar.cedula,
      direccion: props.usuarioEditar.direccion,
      fechaDeNacimiento: moment(props.usuarioEditar?.fechaDeNacimieno),
      contactoDeEmergencia: props.usuarioEditar.contactoDeEmergencia,
      buenaConductaFechaExpiracion: moment(
        props.usuarioEditar?.buenaConductaFechaExpiracion
      ),
      analisisFechaDeExpiracion: moment(
        props.usuarioEditar?.analisisFechaDeExpiracion
      ),
    });
  }, [props.usuarioEditar, form]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`empleados/${props.usuarioEditar.key}`, {
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        celular: values.celular,
        cedula: values.cedula,
        direccion: values.direccion,
        fechaDeNacimiento: values.fechaDeNacimiento,
        contactoDeEmergencia: values.contactoDeEmergencia,
        buenaConductaFechaExpiracion: values.buenaConductaFechaExpiracion,
        analisisFechaDeExpiracion: values.analisisFechaDeExpiracion,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Empleado Actualizado", 2);
    } catch (err) {
      handleError(err);
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="apellido"
          rules={[
            {
              required: true,
              message: "Please input your username!",
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
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Celular"
          name="celular"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input maxLength={10} />
        </Form.Item>
        <Form.Item
          label="Cedula"
          name="cedula"
          rules={[
            {
              required: true,
              message: "Por favor introducte tu cedula",
            },

            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input maxLength={11} />
        </Form.Item>
        <Form.Item label="Direccion" name="direccion">
          <Input />
        </Form.Item>
        <Form.Item
          label="Fecha de Nacimiento"
          name="fechaDeNacimiento"
          rules={[
            {
              required: true,
              message: "Tienes que establecer una fecha de nacimiento",
            },
            {
              validator: validateAge,
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="analisisFechaDeExpiracion"
          label="Expiración de Analisis "
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="buenaConductaFechaExpiracion"
          label="Expiración de papel de buena conducta "
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="contactoDeEmergencia"
          label="Contacto de Emergencia"
          rules={[
            {
              required: true,
              message: "Tienes que introducir un contacto de emergencia",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const stateMapToProps = (state) => {
  return {
    usuarioEditar: state.usuarioEditarSelecionado,
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
  };
};

export default connect(stateMapToProps, {
  CAMBIAR_ESTADO,
})(InfoForm);
