import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  message,
  Select,
  InputNumber,
  Input,
  Checkbox,
  Cascader,
} from "antd";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO } from "../../actions";
import handleError from "../../Data/errorHandle";
import moment from "moment";
const { TextArea } = Input;
const { Option } = Select;

const CrearPermiso = (props) => {
  const [vacacionesTomadas, SetVacacionesTomadas] = useState(false);
  const [form] = Form.useForm();

  let UltimasVacaciones =
    props?.usuarioSelecionado?.Vacaciones[
      props?.usuarioSelecionado?.Vacaciones?.length - 1
    ];
  console.log(
    moment(UltimasVacaciones?.tiempoDeVacaciones[1])?.format("MMMM Do YYYY")
  );

  useEffect(() => {
    form.setFieldsValue({
      nombreNomina: props.nominaCompletaSelect?.nombreNomina,
      horasMensualesTrabajadas: 0,
    });
  }, [props?.usuarioSelecionado]);

  const onChange = (e) => {
    SetVacacionesTomadas(e.target.checked);
  };

  const validateDiasVacaciones = (rule, value, callback) => {
    if (value > 18) {
      callback("No se pueden tomar más de 18 días de vacaciones");
    } else {
      callback();
    }
  };

  const onFinish = async (values) => {
    console.log(values);
    try {
      await Api.post(`despidos/${props?.usuarioSelecionado?._id}`, {
        tipo: values.tipo,
        descripcion: values.descripcion,
        tomoVacaciones: vacacionesTomadas,
        diasVacaciones: values.diasVacaciones,
      });
      form.resetFields();
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Empleado despedido con exito", 3);
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
      <Form.Item label="Tomo Vacaciones?" name="vacaciones">
        <Checkbox onChange={onChange}>Si</Checkbox>
      </Form.Item>

      <Form.Item
        label="Dias de Vacaciones tomados"
        name="diasVacaciones"
        rules={[
          {
            validator: validateDiasVacaciones,
          },
        ]}
      >
        <InputNumber maxLength={2} disabled={!vacacionesTomadas} />
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
