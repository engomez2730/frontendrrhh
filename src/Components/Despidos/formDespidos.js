import React from "react";
import { Button, Form, message, Select, InputNumber, Input } from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
const { TextArea } = Input;
const { Option } = Select;

const CrearPermiso = (props) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await Api.post(`despidos/${props?.usuarioSelecionado?._id}`, {
        tipo: values.tipo,
        descripcion: values.descripcion,
        prestacionesLaborables: values.prestacionesLaborables,
      });
      form.resetFields();
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Empleado despedido con exito", 3);
      props.onCancel();
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
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Tipo de Despido"
        name="tipo"
        rules={[
          {
            required: true,
            message: "Por favor introduce el tipo de Despido",
          },
        ]}
      >
        <Select placeholder="Seleciona una razon">
          <Option value="Renuncia" key={"Renuncia"}>
            Renuncia
          </Option>
          <Option value="Desahucio" key={"Desahucio"}>
            Desahucio
          </Option>
          <Option value="Despido" key={"Despido"}>
            Despido
          </Option>
          <Option value="Dimision" key={"Dimision"}>
            Dimision{" "}
          </Option>
          <Option value="Muerte" key={"Muerte"}>
            Muerte{" "}
          </Option>
        </Select>
      </Form.Item>

      <Form.Item label="Descripcion" name="descripcion">
        <TextArea />
      </Form.Item>
      <Form.Item
        label="Prestaciones Laborables"
        name="prestacionesLaborables"
        rules={[
          {
            required: true,
            message: "Por favor introduce las prestaciones laborables",
          },
        ]}
      >
        <InputNumber style={{ width: "50%" }} />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Depedir Empleado
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    nominasCompletas: state.nominasCompletas.nominasCompletas,
    estado: state.cambiarState,
    usuarioSelecionado: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
    nominaCompletaSelect: state.nominaCompletaSelect.nominaCompletaSelect,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
