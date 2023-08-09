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
import moment from "moment";
import {
  paisesFinal,
  provinciasFinal,
  departamentosFinal,
} from "../../Data/CountriesData";
import { message } from "antd";
import { connect } from "react-redux";
import Api from "../../apis/rrhhApi";
import { BUSCAR_CANDIDATO_ACTION, GET_PUESTOS_ACTION } from "../../actions";
import "./Form.css";
import handleError from "../../Data/errorHandle";
import { useNavigate } from "react-router-dom";

const opcionesLicencia = ["Si", "No"];
const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const App = (props) => {
  const [form] = Form.useForm();
  const [errorAlert, seterrorAlert] = useState(null);
  const [dateInput, dateInputSet] = useState(true);
  const [hideInput, hideInputSet] = useState(true);
  const [hideInputHour, hideInputHourSet] = useState(true);
  const [hideInputLic, hideInputLicSet] = useState(true);

  const history = useNavigate();
  const puestos = props?.puestos?.map((e) => e.nombre);
  const crearSelectArray = (array) => {
    return array?.map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  };

  const puestosFinalArray = crearSelectArray(puestos);
  const opcionesLicenciaBolean = crearSelectArray(opcionesLicencia);
  const opcionesLicenciaCategoria = crearSelectArray(categoriaLicencia);

  const onSelectChange = (e) => {
    if (e === "República Dominicana") {
      hideInputSet(false);
    } else {
      hideInputSet(true);
    }
  };

  const onSelectChangeHour = (e) => {
    console.log(e);
    if (e === "Por Hora") {
      hideInputHourSet(false);
    } else {
      hideInputHourSet(true);
    }
  };

  useEffect(() => {
    props.GET_PUESTOS_ACTION();

    form.setFieldsValue({
      nombre: props.candidato?.nombre,
      apellido: props.candidato?.apellido,
      cedula: props.candidato?.cedula,
      celular: props.candidato?.celular,
      correo: props.candidato?.correo,
      provincia: props.candidato?.provincia,
      pais: props.candidato?.pais,
      puesto: props.candidato?.puestoAplicado,
      direccion: props.candidato?.direccion,
    });
    return () => {
      props.BUSCAR_CANDIDATO_ACTION();
    };
  }, [props.estado]);

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
  };

  const renderSuccess = () => {
    message.success("Empleado creado con exito", 2);
    setTimeout(() => {
      seterrorAlert(null);
      history("/verempleados");
    }, 3000);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values) => {
    const fechaDeSiguientesVacaciones = new Date();
    const month = fechaDeSiguientesVacaciones.getMonth();
    const day = fechaDeSiguientesVacaciones.getDate();
    const year = fechaDeSiguientesVacaciones.getFullYear();

    try {
      const response = await Api.post(
        "http://localhost:5000/api/v1/empleados",
        {
          nombre: values.nombre,
          apellido: values.apellido,
          cedula: values.cedula,
          direccion: values.direccion,
          celular: values.celular,
          correo: values.correo,
          provincia: values.provincia,
          genero: values.sexo,
          pais: values.pais,
          password: values.password,
          vencimientoDelContrato: values.vencimientoDelContrato?._d,
          confirmPassword: values.confirmPassword,
          contrato: values.contrato,
          sueldoFijo: values.salario,
          departamento: values.departamento,
          fechaDeNacimiento: values.fechaDeNacimiento,
          puesto: values.puesto,
          tipoDeNomina: values.tipoDeNomina,
          costoPorHora: values.costoPorHora,
          createdAt: values.createdAt,
          contactoDeEmergencia: values.contactoDeEmergencia,
          licenciasDeConducir:
            values.licenciasDeConducir === "Si" ? true : false,
          tipoLicencia: values.tipoLicencia,
          licenciaDeConducirFechaExp: values.fechaDeExpiracion,
        }
      );
      renderSuccess();
    } catch (err) {
      handleError(err);
    }
  };

  const validateMinLength = (minLength) => (rule, value, callback) => {
    if (value && value.length < minLength) {
      callback(`Necesita tener al menos ${minLength} `);
    } else {
      callback();
    }
  };

  const validateAge = (rule, date, callback) => {
    if (date && moment().diff(date, "years") < 18) {
      callback("Debes ser mayor de 18 años.");
    } else {
      callback();
    }
  };

  const validateMinimumValue = (minValue) => (rule, value, callback) => {
    if (value < minValue) {
      callback(`El numero deber ser al menos${minValue}.`);
    } else {
      callback();
    }
  };

  const validateAllNumbers = (rule, value, callback) => {
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      callback("Debe ser solo numeros");
    } else {
      callback();
    }
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
      {...formItemLayout}
      size="small"
      className="form"
      form={form}
      name="register"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={{
        residence: ["zhejiang", "hangzhou", "xihu"],
        prefix: "86",
      }}
      scrollToFirstError
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
        <Input maxLength={30} showCount />
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
        <Input maxLength={30} showCount />
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
            message: "Tienes que introducir un correo",
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
            message: "Tienes que introducir una cedula!",
          },
          {
            validator: validateMinLength(11),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input maxLength={11} showCount />
      </Form.Item>

      <Form.Item
        name="celular"
        label="Numero de Telefono"
        rules={[
          {
            required: true,
            message: "Tienes que introducir un numero de telefono!",
          },
          {
            validator: validateMinLength(10),
          },
          {
            validator: validateAllNumbers,
          },
        ]}
      >
        <Input maxLength={11} showCount minLength={3} />
      </Form.Item>

      <Form.Item
        name="direccion"
        label="Direccion"
        rules={[
          {
            required: true,
            message: "Tienes que introducir una direcion!",
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
            message: "Tienes que introducir un genero",
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
            message: "Tienes que introducir la fecha de nacimiento",
          },
          {
            validator: validateAge,
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
            message: "Tienes que introducir una pais",
          },
        ]}
      >
        <Select
          placeholder="Seleciona el pais"
          onChange={(e) => onSelectChange(e)}
        >
          {renderPaises(paisesFinal)}
        </Select>
      </Form.Item>
      <Form.Item name="provincia" label="Provincia" hidden={hideInput}>
        <Select placeholder="Seleciona el pais">
          {renderProvincias(provinciasFinal)}
        </Select>
      </Form.Item>

      <Form.Item
        name="salario"
        label="Sueldo Fijo"
        rules={[
          {
            required: true,
            message: "Tienes que introducir un sueldo fijo",
          },
          {
            validator: validateMinimumValue(1),
          },
        ]}
      >
        <InputNumber minLength={1} />
      </Form.Item>

      <Form.Item
        name="contrato"
        label="Contrato"
        rules={[
          {
            required: true,
            message: "Seleciona el tipo de contrato",
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
          <Option value="indefinido">Indefinido</Option>
          <Option value="definido">Definido</Option>
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
            message: "Tienes que introducir el tipo de nomina",
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
        rules={[{ validator: validateMinimumValue(1) }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        name="departamento"
        label="Departamento"
        rules={[
          {
            required: true,
            message: "Tienes que introducir un departamento",
          },
        ]}
      >
        <Select placeholder="Seleciona el tipo de Departamento">
          {renderDepartamentos(departamentosFinal)}
        </Select>
      </Form.Item>
      <Form.Item
        name="puesto"
        label="Puesto"
        rules={[
          {
            required: true,
            message: "Tienes que introducir un puesto",
          },
        ]}
      >
        <Select placeholder="Seleciona el tipo de Puesto">
          {renderDepartamentos(puestosFinalArray)}
        </Select>
      </Form.Item>
      <Form.Item
        label="Licencia de Conducir?"
        name="licenciasDeConducir"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select
          placeholder="Seleciona el estado laboral"
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
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Crear Empleado
        </Button>
      </Form.Item>
      {errorAlert}
    </Form>
  );
};

const stateMapToProps = (state) => {
  return {
    candidato: state.buscarCandidato.buscarCandidato,
    estado: state.cambiarState,
    puestos: state.puestos.puestos,
  };
};

export default connect(stateMapToProps, {
  BUSCAR_CANDIDATO_ACTION,
  GET_PUESTOS_ACTION,
})(App);
