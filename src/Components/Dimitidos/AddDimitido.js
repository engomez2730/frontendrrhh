import {
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Divider,
} from "antd";
import React, { useEffect } from "react";
import { message } from "antd";
import { connect } from "react-redux";
import rrhhApi from "../../apis/rrhhApi";
import { CAMBIAR_ESTADO, GET_PUESTOS_ACTION } from "../../actions";
import handleError from "../../Data/errorHandle";
const { Option } = Select;
const TextArea = Input;

const App = (props) => {
  const [form] = Form.useForm();

  const puestos = props?.puestos?.map((e) => e.nombre);

  useEffect(() => {}, [props?.candidatoSelecionado]);

  const crearSelectArray = (array) => {
    return array?.map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  };

  const puestosFinalArray = crearSelectArray(puestos);

  const onFinish = async (values) => {
    try {
      await rrhhApi.post("empleados/agregardimitidos", {
        nombre: values.nombre,
        apellido: values.apellido,
        cedula: values.cedula,
        inicioLaboral: values.inicioLaboral,
        puesto: values.puesto,
        salarioBruto: values.salarioBruto,
        tipo: values.tipo,
        descripcion: values.descripcion,
        prestacionesLaborables: values.prestacionesLaborables,
        fechaDespido: values.fechaDespido,
      });
      form.resetFields();
      props.onClose();
      props.CAMBIAR_ESTADO(!props?.estado);
      message.success("Añadido con Exito");
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderDepartamentos = (provincas) => {
    return provincas?.map((e) => {
      return (
        <Option value={`${e.label}`} key={e.label}>
          {e.label}
        </Option>
      );
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 8 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      size="small"
      form={form}
    >
      <Form.Item
        name="nombre"
        label="Nombre"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el nombre del empleado",
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="apellido"
        label="Apellido"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el apellido del empleado",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="cedula"
        label="Cedula"
        tooltip="Dcumento de identificacion del empleado"
        rules={[
          {
            required: true,
            message: "Por favor introduce una cedula",
          },
        ]}
      >
        <Input max={11} />
      </Form.Item>

      <Form.Item
        name="salarioBruto"
        label="Salario Anterior"
        rules={[
          {
            required: true,
            message: "Please input donation amount!",
          },
        ]}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>

      <Form.Item
        name="puesto"
        label="Puesto Anterior"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Seleciona el puesto">
          {renderDepartamentos(puestosFinalArray)}
        </Select>
      </Form.Item>
      <Form.Item name="inicioLaboral" label="Inicio Laboral">
        <DatePicker />
      </Form.Item>

      <Divider />

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
        name="fechaDespido"
        label="Fecha de Salida"
        rules={[
          {
            required: true,
            message: "Por favor introduce las prestaciones laborables",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Añadir Dimitido
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    candidatoSelecionado: state.candidatoSelecionado.candidatoSelec,
    puestos: state.puestos.puestos,
    departamentos: state.departamentos.Departamentos,
    equipos: state.Equipos.equipos,
    proyectos: state.Proyectos.proyectos,
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
})(App);
