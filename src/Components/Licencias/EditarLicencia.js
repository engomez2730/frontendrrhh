import React, { useEffect } from "react";
import { Button, Form, Input, DatePicker, message, Select } from "antd";
import moment from "moment";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const { Option } = Select;

const CrearPermiso = (props) => {
  console.log(props.Licencia?.tipoDeLicencia);
  const [form] = Form.useForm();
  const rangeConfig = { rules: [{ type: "array" }] };

  useEffect(() => {
    form.setFieldsValue({
      tiempoDeLicencia: [
        moment(props.Licencia?.tiempoDeLicencia[0]), // Default date for the first element of the array
        moment(props.Licencia?.tiempoDeLicencia[1]), // Default date for the second element of the array
      ],
    });
  }, [props.equipo]);

  const onFinish = async (values) => {
    try {
      await Api.patch(`licencias/${props.Licencia?._id}`, {
        tipoDeLicencia: values.tipoDeLicencia,
        descripcion: values.descripcion,
        tiempoDeLicencia: values.tiempoDeLicencia,
        lugarDelReposo: values.lugarDelReposo,
        empleado: props?.usuario?._id,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Licencia Editada con exito", 3);
      props.onCLose();
      props.onCloseParent();
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
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Editar Licencia
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    Licencia: state.licenciaSelecionada?.licenciaSelect,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
})(CrearPermiso);
