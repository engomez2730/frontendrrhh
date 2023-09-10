import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import handleError from "../../Data/errorHandle";
import moment from "moment";
import { connect } from "react-redux";
import CustomFomItem from "../Custom/CustomFomItem";
import { Link } from "react-router-dom";
import UploadPhoto from "./UploadPhoto";
import {
  Steps,
  Button,
  Form,
  Input,
  Select,
  DatePicker,
  message,
  Result,
} from "antd";
import {
  paisesFinal,
  provinciasFinal,
  departamentosFinal,
  departamentosFinalArray,
  pues,
  puestosFinal,
} from "../../Data/CountriesData";
import { render } from "@testing-library/react";
import rrhhApi from "../../apis/rrhhApi";
import "./Steps.css";
const { TextArea } = Input;
const { Step } = Steps;
const { Option } = Select;

const validateMinLength = (value, minLength) => {
  if (value && value.length < minLength) {
    return Promise.reject(`Debe tener al menos ${minLength} digitos.`);
  }
  return Promise.resolve();
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

const MultiStepComponent = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hideInputLic, hideInputLicSet] = useState(true);
  const [dateInput, dateInputSet] = useState(true);
  const [hideInputHour, hideInputHourSet] = useState(true);

  const [formData, setFormData] = useState({});

  const puestos = props?.puestos?.map((e) => e.nombre);
  const departamentos = props.departamentos?.map((e) => e.nombre);
  /*   const navigate = useNavigate();
   */
  const navigate = useNavigate();

  const opcionesLicencia = ["Si", "No"];
  const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];

  const crearSelectArray = (array) => {
    return array?.map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  };

  const onSelectChangeHour = (e) => {
    if (e === "Por Hora") {
      hideInputHourSet(false);
    } else {
      hideInputHourSet(true);
    }
  };

  const validateAge = (rule, date, callback) => {
    if (date && moment().diff(date, "years") < 18) {
      callback("Debes ser mayor de 18 años.");
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

  const opcionesLicenciaBolean = crearSelectArray(opcionesLicencia);
  const opcionesLicenciaBolean2 = crearSelectArray(categoriaLicencia);

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
  };

  const [form] = Form.useForm(); // Create a form instance
  const departamentosFinalArray = crearSelectArray(departamentos);
  const PuestosFinalArray = crearSelectArray(puestos);
  console.log(props);

  const steps = [
    {
      title: "Informacion Personal",
      content: [
        <CustomFomItem
          label="Nombre"
          name="nombre"
          rules={[
            {
              required: true,
              message: "Por Favor introduce el apellido del nombre",
            },
          ]}
        >
          <Input maxLength={30} />
        </CustomFomItem>,
        <CustomFomItem
          label="Apellido"
          name="apellido"
          rules={[
            {
              required: true,
              message: "Por Favor introduce el apellido del empleado",
            },
          ]}
        >
          <Input maxLength={30} />
        </CustomFomItem>,
        <CustomFomItem
          label="Correo"
          name="correo"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu nombre",
            },
            {
              type: "email",
              message: "Introduce un verdadero correo",
            },
          ]}
        >
          <Input maxLength={30} />
        </CustomFomItem>,
        <CustomFomItem
          label="Cedula"
          name="cedula"
          rules={[
            {
              required: true,
              message: "Por Favor introduce la cedula del empleado",
            },
            {
              validator: (_, value) => validateMinLength(value, 11),
            },
            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input maxLength={11} />
        </CustomFomItem>,
        <CustomFomItem
          label="Celular"
          name="celular"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu numero de telefono",
            },
            {
              validator: (_, value) => validateMinLength(value, 10),
            },
            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input maxLength={10} />
        </CustomFomItem>,

        <CustomFomItem
          label="Genero"
          name="genero"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu nombre",
            },
          ]}
        >
          <Select placeholder="Seleciona tu genero">
            <Option value="Hombre">Hombre</Option>
            <Option value="Mujer">Mujer</Option>
            <Option value="Otro">Otro</Option>
          </Select>
        </CustomFomItem>,

        <CustomFomItem
          label="Fecha de Nacimiento"
          name="fechaDeNacimiento"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu fecha de nacimiento",
            },
            {
              validator: validateAge,
            },
          ]}
        >
          <DatePicker />
        </CustomFomItem>,
        <CustomFomItem
          label="Pais"
          name="pais"
          rules={[
            {
              required: true,
              message: "Por Favor introduce el pais donde recide",
            },
          ]}
        >
          <Select placeholder="Seleciona el pais">
            {renderPaises(paisesFinal)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
          label="Provincia"
          name="provincia"
          rules={[
            {
              required: true,
              message: "Por Favor introduce el pais donde recide",
            },
          ]}
        >
          <Select placeholder="Seleciona el pais">
            {renderPaises(provinciasFinal)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
          label="Dirección"
          name="direccion"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu dirección",
            },
          ]}
        >
          <TextArea maxLength={60} />
        </CustomFomItem>,
      ],
    },
    {
      title: "Informacion Empresarial",
      content: [
        <CustomFomItem
          label="Salario"
          name="salarioBruto"
          rules={[
            {
              required: true,
              message: "Por Favor introduce un salario",
            },
            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input />
        </CustomFomItem>,
        <CustomFomItem
          label="Tipo de Nomina"
          name="tipoDeNomina"
          rules={[
            {
              required: true,
              message: "Por Favor introduce el tipo de nomina",
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
        </CustomFomItem>,
        <CustomFomItem
          name="departamento"
          label="Departamento"
          rules={[
            {
              required: true,
              message: "Por Favor introduce un departamento",
            },
          ]}
        >
          <Select placeholder="Seleciona el puesto">
            {renderPaises(departamentosFinalArray)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
          name="puesto"
          label="Puestos"
          rules={[
            {
              required: true,
              message: "Por Favor introduce un pueto",
            },
          ]}
        >
          <Select placeholder="Seleciona el puesto">
            {renderPaises(PuestosFinalArray)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
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
            <Option value="indefinido">Indefinido</Option>
            <Option value="definido">Definido</Option>
            <Option value="temporal">Temporal</Option>
          </Select>
        </CustomFomItem>,

        <CustomFomItem
          name="vencimientoDelContrato"
          label="Expiración de contrato"
        >
          <DatePicker disabled={dateInput} />
        </CustomFomItem>,
        <CustomFomItem
          label="Licencia de Conducir?"
          name="licenciasDeConducir"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Select
            placeholder="Seleciona el estado de licencia"
            onChange={(e) => onSelectChangeLic(e)}
          >
            {renderPaises(opcionesLicenciaBolean)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
          label="Fecha de Exp de Licencia"
          name="fechaDeExpiracion"
          hidden={hideInputLic}
        >
          <DatePicker />
        </CustomFomItem>,
        <CustomFomItem
          label="Tipo De Licencia"
          name="tipoLicencia"
          hidden={hideInputLic}
        >
          <Select placeholder="Seleciona el estado laboral">
            {renderPaises(opcionesLicenciaBolean2)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem
          name="contactoDeEmergencia"
          label="Contacto de Emergencia"
          rules={[
            {
              required: true,
              message: "Tienes que introducir un contacto de emergencia",
            },
            {
              validator: validateAllNumbers,
            },
          ]}
        >
          <Input />
        </CustomFomItem>,
        <CustomFomItem
          label="Inicio Laboral"
          name="createdAt"
          rules={[
            {
              required: true,
              message: "Por Favor introduce tu fecha de nacimiento",
            },
          ]}
        >
          <DatePicker />
        </CustomFomItem>,
      ],
    },
    {
      title: "Crear Empleado",
      content: <div></div>,
    },
    {
      title: "Empleado Creado",
      content: (
        <div className="finalStep">
          <Result
            status="success"
            title={`Empleado ${formData.nombre} creado con exito`}
            subTitle={`Ya el empleado forma parte de la empresa Vargang`}
            extra={[
              <Button type="primary">
                <Link to="/verempleados">Ir a Empleados</Link>
              </Button>,
            ]}
          ></Result>
        </div>
      ),
    },
  ];

  const handleNext = async () => {
    try {
      const values = await form.validateFields();
      setFormData({ ...formData, ...values });
      setCurrentStep(currentStep + 1);
    } catch (err) {
      alert(err.message);
      handleError(err);
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleFinalSubmit = async () => {
    try {
      const values = await form.validateFields();
      setFormData({ ...formData, ...values });
      const data = await rrhhApi.post("empleados", {
        nombre: formData.nombre,
        apellido: formData.apellido,
        correo: formData.correo,
        celular: formData.celular,
        cedula: formData.cedula,
        provincia: formData.provincia,
        pais: formData.pais,
        direccion: formData.direccion,
        puesto: formData.puesto,
        departamento: formData.departamento,
        genero: formData.genero,
        tipoDeNomina: formData.tipoDeNomina,
        costoPorHora: formData.costoPorHora,
        salarioBruto: formData.salarioBruto,
        fechaDeNacimiento: formData.fechaDeNacimiento,
        fechaDeNacimiento: formData.fechaDeNacimiento,
        createdAt: formData.createdAt,
        licenciasDeConducir:
          formData.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: formData.tipoLicencia,
        licenciaDeConducirFechaExp: formData.fechaDeExpiracion,
        contactoDeEmergencia: formData.contactoDeEmergencia,
      });
      form.resetFields();
      message.success("Creado con Éxito", 3);
      handleNext();
    } catch (errorInfo) {
      handleError(errorInfo);
    }
  };

  return (
    <div className="steps">
      <Steps current={currentStep} className="stepInfo">
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>

      {currentStep === steps.length - 2 ? ( // Only render form for the last step
        <div className="stepsForm" /* style={{ display: "none" }} */>
          <Form form={form} onFinish={handleFinalSubmit}>
            {steps[currentStep].content}
            <div className="submitStep">
              <Button
                style={{ marginRight: 8 }}
                onClick={handlePrev}
                size="large"
              >
                Anterior
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                Crear Empleado
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        // Render form for other steps
        <Form
          name="basic"
          labelCol={{ span: 32 }}
          wrapperCol={{ span: 32 }}
          form={form}
          onFinish={handleNext}
          className="stepsForm"
          labelAlign="left"
        >
          {steps[currentStep].content}
          <div>
            {currentStep > 0 && (
              <Button style={{ marginRight: 8 }} onClick={handlePrev}>
                Anterior
              </Button>
            )}
            <Button
              type="primary"
              htmlType="submit"
              disabled={currentStep === 3 ? true : false}
            >
              Siguiente
            </Button>
          </div>
        </Form>
      )}
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    puestos: state.puestos.puestos,
    departamentos: state.departamentos.Departamentos,
  };
};

export default connect(StateMapToProps, {})(MultiStepComponent);
