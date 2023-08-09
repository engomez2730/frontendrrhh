import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, DatePicker } from "antd";
import { departamentosFinal } from "../../Data/CountriesData";
import {
  editarUsuario,
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
} from "../../actions";
import { connect } from "react-redux";
import Api from "../../apis/rrhhApi";
import { message } from "antd";
import handleError from "../../Data/errorHandle";
import moment from "moment";
const { Option } = Select;
const opcionesLicencia = ["Si", "No"];
const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];

const CompanyModalEdit = (props) => {
  const [form] = Form.useForm();
  const [errorAlert, errorAlertSet] = useState("");
  const [dateInput, dateInputSet] = useState(true);
  const [hideInputLic, hideInputLicSet] = useState(true);

  const opcionesLicencia = ["Si", "No"];

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

  const validateAge = (rule, date, callback) => {
    if (date && moment().diff(date, "years") < 18) {
      callback("Debes ser mayor de 18 años.");
    } else {
      callback();
    }
  };

  const validateMinimumValue = (minValue) => (rule, value, callback) => {
    if (value < minValue) {
      callback(`El numero deber ser al menos ${minValue}.`);
    } else {
      callback();
    }
  };

  const opcionesLicenciaBolean = crearSelectArray(opcionesLicencia);
  const opcionesLicenciaCategoria = crearSelectArray(categoriaLicencia);

  const onSelectChangeLic = (e) => {
    if (e === "No") {
      hideInputLicSet(true);
    } else {
      hideInputLicSet(false);
    }
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

  useEffect(() => {
    props.GET_PUESTOS_ACTION();
    console.log(props.usuarioEditar);
    form.setFieldsValue({
      sueldoFijo: props.usuarioEditar.sueldoFijo,
      contrato: props.usuarioEditar.contrato,
      departamento: props.usuarioEditar.departamento,
      expiracionDelContrato: moment(props.usuarioEditar.expiracionDelContrato),
      vacacionesTomadas: props.usuarioEditar.vacacionesTomadas,
      contactoDeEmergencia: props.usuarioEditar.contactoDeEmergencia,
      licenciasDeConducir: props.usuarioEditar?.licenciasDeConducir
        ? "Si"
        : "No",
      tipoLicencia: props.usuarioEditar?.tipoLicencia,
      fechaDeExpiracion: moment(
        props.usuarioEditar?.licenciaDeConducirFechaExp
      ),
      puesto: props.usuarioEditar?.puesto,
      contactoDeEmergencia: props.usuarioEditar?.contactoDeEmergencia,
      salarioBruto: props.usuarioEditar?.salarioBruto,
    });
  }, [props.usuarioEditar]);

  const puestos = props?.puestos?.map((e) => e.nombre);
  const puestosFinalArray = crearSelectArray(puestos);

  const onFinish = async (values) => {
    console.log("Success:", values);
    try {
      const data = await Api.patch(`empleados/${props?.usuarioEditar?.key}`, {
        salarioBruto: values.salarioBruto,
        contrato: values.contrato,
        departamento: values.departamento,
        celular: values.celular,
        expiracionDelContrato: values.expiracionDelContrato,
        vacacionesTomadas: values.vacacionesTomadas,
        contactoDeEmergencia: values.contactoDeEmergencia,
        licenciasDeConducir: values.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: values.tipoLicencia,
        licenciaDeConducirFechaExp: values.fechaDeExpiracion,
        puesto: values.puesto,
      });
      props.CAMBIAR_ESTADO(!props.estado);
      message.success("Empleado Actualizado", 2);
    } catch (err) {
      handleError(err);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        form={form}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Sueldo Bruto"
          name="salarioBruto"
          rules={[
            {
              required: true,
              message: "Introduce un sueldo fijo",
            },
            {
              validator: validateMinimumValue(1),
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="contrato"
          label="Contrato"
          rules={[
            {
              required: true,
              message: "Introduce un contrato",
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
            <Option value="definido">definido</Option>
            <Option value="indefinido">indefinido</Option>
            <Option value="temporal">temporal</Option>
          </Select>
        </Form.Item>
        <Form.Item name="expiracionDelContrato" label="Expiración de contrato">
          <DatePicker disabled={dateInput} />
        </Form.Item>
        <Form.Item
          name="departamento"
          label="Departamento"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Seleciona el tipo de Departamento">
            {renderDepartamentos(departamentosFinal)}
          </Select>
        </Form.Item>

        <Form.Item name="puesto" label="Puesto">
          <Select placeholder="Seleciona el puesto">
            {renderDepartamentos(puestosFinalArray)}
          </Select>
        </Form.Item>

        <Form.Item
          label="Licencia de Conducir?"
          name="licenciasDeConducir"
          rules={[
            {
              required: true,
              message: "Tienes que definir si tienes licencia o no",
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

        <Form.Item label="Fecha de Exp de Licencia" name="fechaDeExpiracion">
          <DatePicker />
        </Form.Item>
        <Form.Item label="Tipo De Licencia" name="tipoLicencia">
          <Select placeholder="Seleciona el estado laboral">
            {renderProvincias(opcionesLicenciaCategoria)}
          </Select>
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
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Actualizar
          </Button>
        </Form.Item>
      </Form>
      {errorAlert}
    </div>
  );
};

const stateMapToProps = (state) => {
  return {
    usuarioEditar: state.usuarioEditarSelecionado,
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
    puestos: state.puestos.puestos,
  };
};

export default connect(stateMapToProps, {
  editarUsuario,
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
})(CompanyModalEdit);
