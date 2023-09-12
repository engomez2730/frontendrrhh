import {
  Alert,
  Button,
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
} from "antd";
import React, { useState, useEffect } from "react";
import {
  paisesFinal,
  provinciasFinal,
  departamentosFinal,
  puestosFinal,
} from "../../Data/CountriesData";
import { message } from "antd";
import { connect } from "react-redux";
import rrhhApi from "../../apis/rrhhApi";
import { CAMBIAR_ESTADO, GET_PUESTOS_ACTION } from "../../actions";
import handleError from "../../Data/errorHandle";
import moment from "moment";
import CustomForItem from "../Custom/CustomFomItem";
const { Option } = Select;

const opcionesLicencia = ["Si", "No"];
const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];

const App = (props) => {
  const [dateInput, dateInputSet] = useState(true);
  const [hideInputHour, hideInputHourSet] = useState(true);
  const [hideInputLic, hideInputLicSet] = useState(true);

  const [form] = Form.useForm();

  const onSelectChangeHour = (e) => {
    if (e === "Por Hora") {
      hideInputHourSet(false);
    } else {
      hideInputHourSet(true);
    }
  };

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
  };

  useEffect(() => {
    form.setFieldsValue({
      nombre: props.candidatoSelecionado?.nombre,
      apellido: props.candidatoSelecionado?.apellido,
      cedula: props.candidatoSelecionado?.cedula,
      celular: props.candidatoSelecionado?.celular,
      correo: props.candidatoSelecionado?.correo,
      pais: props.candidatoSelecionado?.pais,
      provincia: props.candidatoSelecionado?.provincia,
      direccion: props.candidatoSelecionado?.direccion,
      /*       puesto: props.candidatoSelecionado?.puestoAplicado,
       */ sexo: props.candidatoSelecionado?.sexo,
      fechaDeNacimiento: moment(props.candidatoSelecionado?.fechaDeNacimiento),
      licenciasDeConducir: props.candidatoSelecionado?.licenciasDeConducir
        ? "Si"
        : "No",
      tipoLicencia: props.candidatoSelecionado?.tipoLicencia,
      fechaDeExpiracion: moment(
        props.candidatoSelecionado?.licenciaDeConducirFechaExp
      ),
      salarioBruto: props.candidatoSelecionado?.salarioBruto,
    });
  }, [props?.candidatoSelecionado]);

  const puestos = props?.puestos?.map((e) => e.nombre);
  const departamentos = props.departamentos?.map((e) => e.nombre);

  const crearSelectArray = (array) => {
    return array?.map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  };

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
      callback("Deben ser solo numeros");
    } else {
      callback();
    }
  };

  const puestosFinalArray = crearSelectArray(puestos);
  const departamentosFinalArray = crearSelectArray(departamentos);
  const opcionesLicenciaBolean = crearSelectArray(opcionesLicencia);
  const opcionesLicenciaCategoria = crearSelectArray(categoriaLicencia);

  const onFinish = async (values) => {
    try {
      const data = await rrhhApi.post("empleados", {
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        celular: values.celular,
        cedula: values.cedula,
        provincia: values.provincia,
        password: values.password,
        confirmPassword: values.confirmPassword,
        pais: values.pais,
        direccion: values.direccion,
        entrevistado: values.entrevistado,
        estadoLaboral: values.estadoLaboral,
        puesto: values.puesto,
        departamento: values.departamento,
        genero: values.sexo,
        tipoDeNomina: values.tipoDeNomina,
        costoPorHora: values.costoPorHora,
        salarioBruto: values.salarioBruto,
        fechaDeNacimiento: values.fechaDeNacimiento,
        createdAt: values.createdAt,
        licenciasDeConducir: values.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: values.tipoLicencia,
        licenciaDeConducirFechaExp: values.fechaDeExpiracion,
        contactoDeEmergencia: values.contactoDeEmergencia,
      });
      form.resetFields();
      props?.CAMBIAR_ESTADO(!props?.estado);
      message.success("Creado con Exito");
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const renderPaises = (Countries) => {
    return Countries?.map((e) => {
      return (
        <Option value={`${e.label}`} key={e.label}>
          {e.label}
        </Option>
      );
    });
  };

  const renderProvincias = (provincas) => {
    return provincas?.map((e) => {
      return (
        <Option value={`${e.label}`} key={e.label}>
          {e.label}
        </Option>
      );
    });
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
      <CustomForItem
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
      </CustomForItem>
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
        name="correo"
        label="Correo"
        rules={[
          {
            type: "email",
            message: "Introduce un verdadero correo",
          },
          {
            required: true,
            message: "Introduce un correo",
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
            message: "Please input your nickname!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="celular"
        label="Numero de Telefono"
        rules={[
          {
            required: true,
            message: "Please input your phone number!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="direccion"
        label="Direccion"
        rules={[
          {
            required: true,
            message: "Please input Intro",
          },
        ]}
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>

      <Form.Item
        name="sexo"
        label="Genero"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Seleciona tu genero">
          <Option value="Hombre">Hombre</Option>
          <Option value="Mujer">Mujer</Option>
          <Option value="Otro">Otro</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="fechaDeNacimiento"
        label="Fecha de Nacimiento"
        rules={[
          {
            required: true,
            message: "Necesita intruducir su fecha de nacimiento",
          },
        ]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="pais"
        label="Pais"
        rules={[
          {
            required: true,
            message: "Por favor seleciona un pais",
          },
        ]}
      >
        <Select placeholder="Seleciona el pais">
          {renderPaises(paisesFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        name="provincia"
        label="Provincia"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Seleciona el pais">
          {renderProvincias(provinciasFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Licencia de Conducir?"
        name="licenciasDeConducir"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select
          placeholder="Seleciona el estado de licencia"
          onChange={(e) => onSelectChangeLic(e)}
        >
          {renderProvincias(opcionesLicenciaBolean)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Fecha de Exp de Licencia"
        name="fechaDeExpiracion"
        hidden={hideInputLic}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item
        label="Tipo De Licencia"
        name="tipoLicencia"
        hidden={hideInputLic}
      >
        <Select placeholder="Seleciona el estado laboral">
          {renderProvincias(opcionesLicenciaCategoria)}
        </Select>
      </Form.Item>
      <Form.Item
        name="salarioBruto"
        label="Salario Bruto"
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
        name="contrato"
        label="Contrato"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select
          placeholder="Seleciona el tipo de contrato"
          onChange={(e) => {
            if (e === "definido") {
              dateInputSet(false);
            } else if (e === "indefinido") {
              dateInputSet(true);
            } else if (e === "temporal") {
              dateInputSet(false);
            }
          }}
        >
          <Option value="definido">Definido</Option>
          <Option value="indefinido">Indefinido</Option>
          <Option value="temporal">Temporal</Option>
        </Select>
      </Form.Item>
      <Form.Item name="vencimientoDelContrato" label="Expiración de contrato">
        <DatePicker disabled={dateInput} />
      </Form.Item>
      <Form.Item
        name="tipoDeNomina"
        label="Tipo de Nomina"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select
          placeholder="Seleciona el tipo de nomina"
          onChange={(e) => onSelectChangeHour(e)}
        >
          <Option value="Nomina Fija">Nomina Fija</Option>
          <Option value="Por Hora">Por Hora</Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="costoPorHora"
        label="Costo de Hora"
        hidden={hideInputHour}
      >
        <InputNumber
          style={{
            width: "100%",
          }}
        />
      </Form.Item>
      <Form.Item
        name="departamento"
        label="Departamento"
        rules={[
          {
            required: true,
            message: "Please select gender!",
          },
        ]}
      >
        <Select placeholder="Seleciona el puesto">
          {renderDepartamentos(departamentosFinalArray)}
        </Select>
      </Form.Item>

      <Form.Item
        name="puesto"
        label="Puesto"
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

      <Form.Item name="createdAt" label="Inicio Laboral">
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
          {
            validator: validateMinLength(10),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input maxLength={10} />
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Convertir en Empleado
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
  };
};

export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
})(App);
