import {
  Button,
  Form,
  Input,
  Select,
  message,
  DatePicker,
  InputNumber,
} from "antd";
import moment from "moment";
import TextArea from "antd/lib/input/TextArea";
import React, { useEffect, useState } from "react";
import rrhhApi from "../../apis/rrhhApi";
import {
  BUSCAR_SOLICITANTE_ACTION,
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
} from "../../actions";
import { connect } from "react-redux";
import {
  paisesFinal,
  provinciasFinal,
  estadoCandidatoFinal,
} from "../../Data/CountriesData";

import handleError from "../../Data/errorHandle";
const { Option } = Select;

const opcionesLicencia = ["Si", "No"];
const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];

const App = (props) => {
  const [form] = Form.useForm();
  const [vacantes, setVacantes] = useState([]);
  const [hideInputLic, hideInputLicSet] = useState(true);

  const getVacantes = async () => {
    const vacantes = await rrhhApi.get("vacantes");
    setVacantes(vacantes.data.data?.Vacantes.map((e) => e.nombre));
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

  const validateAllNumbers = (rule, value, callback) => {
    const regex = /^\d+$/;
    if (!regex.test(value)) {
      callback("Deben ser solo numeros");
    } else {
      callback();
    }
  };

  useEffect(() => {
    getVacantes();
    props.GET_PUESTOS_ACTION();
    form.setFieldsValue(
      {
        nombre: props.solicitante?.nombre,
        apellido: props.solicitante?.apellido,
        cedula: props.solicitante?.cedula,
        celular: props.solicitante?.celular,
        correo: props.solicitante?.correo,
        pais: props.solicitante?.pais,
        provincia: props.solicitante?.provincia,
        puestoAplicado: props.solicitante?.puesto,
      },
      [props.solicitante]
    );

    return () => {
      props.BUSCAR_SOLICITANTE_ACTION();
    };
  }, [props.estado]);

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

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
  };

  const onFinish = async (values) => {
    try {
      const data = await rrhhApi.post("entrevistados", {
        nombre: values.nombre,
        apellido: values.apellido,
        correo: values.correo,
        celular: values.celular,
        cedula: values.cedula,
        provincia: values.provincia,
        pais: values.pais,
        puestoAplicado: values.puestoAplicado,
        direccion: values.direccion,
        entrevistado: values.entrevistado,
        estadoLaboral: values.estadoLaboral,
        vacanteAplicada: values.vacanteAplicada,
        sexo: values.sexo,
        licenciasDeConducir: values.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: values.tipoLicencia,
        licenciaDeConducirFechaExp: values.fechaDeExpiracion,
        puesto: values.puestoAplicado,
      });

      form.resetFields();

      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Candidato creado con exito");
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
  const renderVacantes = (provincas) => {
    return provincas?.map((e, index) => {
      return (
        <Option value={`${e}`} key={index}>
          {e}
        </Option>
      );
    });
  };
  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 32 }}
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      style={{ width: "500px" }}
      form={form}
      size="small"
    >
      <Form.Item
        label="Nombre"
        name="nombre"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el nombre del candidato",
          },
        ]}
      >
        <Input maxLength={30} showCount />
      </Form.Item>

      <Form.Item
        label="Apellido"
        name="apellido"
        rules={[
          {
            required: true,
            message: "Tienes que introducir el apellido del candidato",
          },
        ]}
      >
        <Input maxLength={30} showCount />
      </Form.Item>

      <Form.Item
        label="Correo"
        name="correo"
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
        label="Cedula"
        name="cedula"
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
        <Input maxLength={11} />
      </Form.Item>
      <Form.Item
        label="Celular"
        name="celular"
        rules={[
          {
            required: true,
            message: "Tienes que introducir una celular!",
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
        label="Direccion"
        name="direccion"
        rules={[
          {
            required: true,
            message: "Tienes que introducir una direcion!",
          },
        ]}
      >
        <TextArea />
      </Form.Item>

      <Form.Item
        name="sexo"
        label="Genero"
        rules={[
          {
            required: true,
            message: "Por Favor introduce tu genero",
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
        label="Pais"
        name="pais"
        rules={[
          {
            required: true,
            message: "Tienes que introducir un numero de telefono!",
          },
        ]}
      >
        <Select placeholder="Seleciona el Pais">
          {renderPaises(paisesFinal)}
        </Select>
      </Form.Item>
      <Form.Item label="Provincia" name="provincia">
        <Select placeholder="Seleciona la provincia">
          {renderProvincias(provinciasFinal)}
        </Select>
      </Form.Item>

      <Form.Item
        label="Licencia de Conducir?"
        name="licenciasDeConducir"
        rules={[
          {
            required: true,
            message: "Tienes que especificar si tienes licencia de conducir",
          },
        ]}
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
      <Form.Item label="Estado Laboral" name="estadoLaboral">
        <Select placeholder="Seleciona el estado laboral">
          {renderProvincias(estadoCandidatoFinal)}
        </Select>
      </Form.Item>

      <Form.Item
        label="Vacante Aplicada"
        name="vacanteAplicada"
        rules={[{ required: true, message: "Please input your password!" }]}
      >
        <Select placeholder="Seleciona el estado laboral">
          {renderVacantes(vacantes)}
        </Select>
      </Form.Item>
      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Crear Candidato
        </Button>
      </Form.Item>
    </Form>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    solicitante: state.buscarSolicitante.buscarSolicitante,
    puestos: state.puestos.puestos,
  };
};

export default connect(StateMapToProps, {
  BUSCAR_SOLICITANTE_ACTION,
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
})(App);
