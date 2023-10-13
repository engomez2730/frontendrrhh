import React, { useState } from "react";
import { Button, Form, Input, DatePicker, message, Select } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const CrearPermiso = (props) => {
  const [form] = Form.useForm();
  const rangeConfig = { rules: [{ type: "array" }] };

  const onFinish = async (values) => {
    try {
      await Api.post(`licencias`, {
        tipoDeLicencia: values.tipoDeLicencia,
        descripcion: values.descripcion,
        tiempoDeLicencia: values.tiempoDeLicencia,
        lugarDelReposo: values.lugarDelReposo,
        empleado: props?.usuario?._id,
        historial: {
          accion: "Licencia Medica",
          fecha: new Date(),
          color: "#FF8A07",
        },
      });
      form.resetFields();
      props.onCLose();
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Licencia Creada con exito", 3);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {};
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
        label="Tipo De Licencia"
        name="tipoDeLicencia"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce una razon",
          },
        ]}
      >
        <Select placeholder="Seleciona el tipo de licencia">
          <Option value="Licencia Medica">Licencia Medica</Option>
          <Option value="Licencia por Maternidad">
            Licencia de Maternidad
          </Option>
          <Option value="Licencia Familiar">
            Licencia por grave calamidad doméstica
          </Option>
          <Option value="Licencia por Luto">Licencia por luto</Option>
          <Option value="otro">Otro </Option>
        </Select>
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
        name="tiempoDeLicencia"
        label="Tiempo de Licencia"
        {...rangeConfig}
        rules={[
          {
            required: true,
            message: "Por Favor introduce el timepo de la licencia",
          },
        ]}
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        label="Lugar de Reposo"
        name="lugarDelReposo"
        rules={[
          {
            required: true,
            message: "Por Favor Introduce un lugar de reposo",
          },
        ]}
      >
        <Select placeholder="Seleciona el lugar de reposo">
          <Option value="casa">Casa</Option>
          <Option value="hospital">Hospital</Option>
          <Option value="otro">Otro</Option>
        </Select>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Licencia
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    usuario: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
    permisoSelecioandoData: state.permisoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
