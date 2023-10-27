import React, { useState } from "react";
import handleError from "../../Data/errorHandle";
import { connect } from "react-redux";
import CustomFomItem from "../Custom/CustomFomItem";
import { CAMBIAR_ESTADO } from "../../actions";
import { Link } from "react-router-dom";
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
import { paisesFinal, provinciasFinal } from "../../Data/CountriesData";
import rrhhApi from "../../apis/rrhhApi";
import requireAuth from "../requireAuth";
import {
  validateMinLength,
  validateAge,
  validateAllNumbers,
} from "../Utils/Validators";
import { returnOption, prepareOptionLabels } from "../Utils/helperFunctions";
import "./Steps.css";
const { TextArea } = Input;
const { Step } = Steps;
const { Option } = Select;

const MultiStepComponent = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [hideInputLic, hideInputLicSet] = useState(true);
  const [dateInput, dateInputSet] = useState(true);

  const [formData, setFormData] = useState({});

  const puestos = props?.puestos?.map((e) => e.nombre);
  const departamentos = props.departamentos?.map((e) => e.nombre);
  const equipos = props.equipos?.map((e) => e.nombre);
  const proyectos = props.proyectos?.map((e) => e.nombre);

  const opcionesLicencia = ["Si", "No"];
  const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];
  const opcionesStatus = [
    "Activo",
    "Disponible",
    "Licencia Medica",
    "Licencia Materna",
    "De Vacaciones",
  ];

  function updateState() {
    props.CAMBIAR_ESTADO(!props.estado);
  }

  const opcionesLicenciaBolean = prepareOptionLabels(opcionesLicencia);
  const opcionesLicenciaBolean2 = prepareOptionLabels(categoriaLicencia);
  const opcionesProyectos = prepareOptionLabels(proyectos);

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
  };

  const [form] = Form.useForm(); // Create a form instance
  const departamentosFinalArray = prepareOptionLabels(departamentos);
  const PuestosFinalArray = prepareOptionLabels(puestos);
  const equiposFinalArray = prepareOptionLabels(equipos);
  const opcionesStatusArray = prepareOptionLabels(opcionesStatus);

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
          label="Fecha de expiración de Analisis"
          name="analisisFechaDeExpiracion"
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
            {returnOption(paisesFinal)}
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
            {returnOption(provinciasFinal)}
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
          <Select placeholder="Seleciona el tipo de nomina">
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
            {returnOption(departamentosFinalArray)}
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
            {returnOption(PuestosFinalArray)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem name="equipos" label="Seleciona los equipos que maneja">
          <Select placeholder="Seleciona el puesto" mode="multiple">
            {returnOption(equiposFinalArray)}
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
          name="expiracionDelContrato"
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
            {returnOption(opcionesLicenciaBolean)}
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
            {returnOption(opcionesLicenciaBolean2)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem label="Proyecto Actual" name="proyectoActual">
          <Select placeholder="Seleciona el estado laboral">
            {returnOption(opcionesProyectos)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem label="Estado Laboral" name="StatusLaboral">
          <Select placeholder="Seleciona el estado laboral">
            {returnOption(opcionesStatusArray)}
          </Select>
        </CustomFomItem>,
        <CustomFomItem label="Comentario Estado" name="comentarioStatus">
          <Input />
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
            {
              validator: validateMinLength,
            },
          ]}
        >
          <Input />
        </CustomFomItem>,
        <CustomFomItem
          label="Inicio Laboral"
          name="inicioLaboral"
          rules={[
            {
              required: true,
              message:
                "Por Favor introduce la fecha cuando empezó a laboral en la empresa",
            },
          ]}
        >
          <DatePicker />
        </CustomFomItem>,
        <CustomFomItem
          label="Fecha de expiración de papel de buena conducta"
          name="buenaConductaFechaExpiracion"
        >
          <DatePicker />
        </CustomFomItem>,
        <CustomFomItem
          label="Fecha de expiración de inducción"
          name="induccionFechaDeExpiracion"
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
              <Button type="primary" onClick={() => updateState()}>
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
      console.log(formData.estadoLaboral);
      await rrhhApi.post("empleados", {
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
        Equipos: formData.equipos,
        inicioLaboral: formData.inicioLaboral,
        licenciasDeConducir:
          formData.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: formData.tipoLicencia,
        licenciaDeConducirFechaExp: formData.fechaDeExpiracion,
        contactoDeEmergencia: formData.contactoDeEmergencia,
        buenaConductaFechaExpiracion: formData.buenaConductaFechaExpiracion,
        induccionFechaDeExpiracion: formData.induccionFechaDeExpiracion,
        analisisFechaDeExpiracion: formData.analisisFechaDeExpiracion,
        expiracionDelContrato: formData.expiracionDelContrato,
        contrato: formData.contrato,
        proyectoActual: formData.proyectoActual,
        StatusLaboral: formData.StatusLaboral,
        comentarioStatus: formData.comentarioStatus,
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
    estado: state.cambiarState,
    equipos: state.Equipos.equipos,
    proyectos: state.Proyectos.proyectos,
  };
};

export default requireAuth(
  connect(StateMapToProps, {
    CAMBIAR_ESTADO,
  })(MultiStepComponent)
);
