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
import { validateMinLength } from "../Utils/Validators";
import { returnOption } from "../Utils/helperFunctions";
const { Option } = Select;

const CompanyModalEdit = (props) => {
  const crearSelectArray = (array) => {
    return array?.map((e) => {
      return {
        label: e,
        value: e,
      };
    });
  };

  const [form] = Form.useForm();
  //State
  const [dateInput, dateInputSet] = useState(props.usuarioEditar?.contrato);
  const [tipoDeNomina, tipoDeNominaSet] = useState(
    props.usuarioEditar.tipoDeNomina
  );
  const [selectChange, onSelectChange] = useState(
    props.usuarioEditar?.licenciasDeConducir
  );

  const opcionesStatus = [
    "Activo",
    "Disponible",
    "Licencia Medica",
    "Licencia Materna",
  ];

  //Data
  const puestos = props?.puestos?.map((e) => e.nombre);
  const puestosFinalArray = crearSelectArray(puestos);
  const equipos = props.equipos?.map((e) => e.nombre);
  const equiposFinalArray = crearSelectArray(equipos);
  const usuarioEquiposFinal = crearSelectArray(props?.usuarioEditar.Equipos);
  const opcionesLicencia = ["Si", "No"];
  const categoriaLicencia = ["Categoria 01", "Categoria 02", "Categoria 03"];
  const opcionesLicenciaCategoria = crearSelectArray(categoriaLicencia);
  const opcionesLicenciaBolean = crearSelectArray(opcionesLicencia);
  const proyectosFinal = props.proyectos?.map((e) => e.nombre);
  const opcionesProyectos = crearSelectArray(proyectosFinal);
  const opcionesStatusArray = crearSelectArray(opcionesStatus);

  useEffect(() => {
    props.GET_PUESTOS_ACTION();

    form.setFieldsValue({
      salarioBruto: props.usuarioEditar.salarioBruto,
      contrato: props.usuarioEditar.contrato,
      departamento: props.usuarioEditar.departamento,
      costoPorHora: props.usuarioEditar?.costoPorHora,
      expiracionDelContrato: props.usuarioEditar.expiracionDelContrato
        ? moment(props.usuarioEditar.expiracionDelContrato)
        : "",
      vacacionesTomadas: props.usuarioEditar.vacacionesTomadas,
      licenciasDeConducir: props.usuarioEditar?.licenciasDeConducir
        ? "Si"
        : "No",
      tipoLicencia: props.usuarioEditar?.tipoLicencia,
      fechaDeExpiracion: selectChange
        ? moment(props.usuarioEditar?.licenciaDeConducirFechaExp)
        : null,
      puesto: props.usuarioEditar?.puesto,
      rol: props.usuarioEditar?.rol,
      tipoDeNomina: props.usuarioEditar?.tipoDeNomina,
      induccionFechaDeExpiracion: moment(
        props.usuarioEditar?.induccionFechaDeExpiracion
      ),

      equipos: usuarioEquiposFinal,
      proyectoActual: props.usuarioEditar?.proyectoActual,
      comentarioStatus: props.usuarioEditar?.comentarioStatus,
      StatusLaboral: props.usuarioEditar?.StatusLaboral,
    });
  }, [props.usuarioEditar]);

  const onFinish = async (values) => {
    if (dateInput === "indefinido") {
      values.expiracionDelContrato = null;
    }
    console.log(values.licenciasDeConducir);

    if (values.licenciasDeConducir === "No") {
      console.log("Boo");
      values.licenciaDeConducirFechaExp = null;
      values.tipoLicencia = null;
    }
    try {
      await Api.patch(`empleados/${props?.usuarioEditar?.key}`, {
        salarioBruto: values.salarioBruto,
        contrato: values.contrato,
        departamento: values.departamento,
        celular: values.celular,
        expiracionDelContrato: values.expiracionDelContrato,
        vacacionesTomadas: values.vacacionesTomadas,
        licenciasDeConducir: values.licenciasDeConducir === "Si" ? true : false,
        tipoLicencia: values.tipoLicencia,
        licenciaDeConducirFechaExp: values.fechaDeExpiracion,
        puesto: values.puesto,
        rol: values.rol,
        tipoDeNomina: values.tipoDeNomina,
        induccionFechaDeExpiracion: values.induccionFechaDeExpiracion,
        costoPorHora: values.costoPorHora,
        proyectoActual: values.proyectoActual,
        comentarioStatus: values.comentarioStatus,
        StatusLaboral: values.StatusLaboral,
        Equipos: values.equipos.map((e) => {
          if (e.label) {
            return e.label;
          } else {
            return e;
          }
        }),
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
              dateInputSet(e);
            }}
          >
            <Option value="definido">definido</Option>
            <Option value="indefinido">indefinido</Option>
            <Option value="temporal">temporal</Option>
          </Select>
        </Form.Item>
        <Form.Item name="expiracionDelContrato" label="Expiración de contrato">
          <DatePicker disabled={dateInput === "indefinido" ? true : false} />
        </Form.Item>
        <Form.Item
          name="tipoDeNomina"
          label="Tipo de Nomina"
          rules={[
            {
              required: true,
              message: "Introduce un contrato",
            },
          ]}
        >
          <Select
            placeholder="Seleciona el tipo de nomina"
            onChange={(e) => tipoDeNominaSet(e)}
          >
            <Option value="Nomina Fija">Nomina Fija</Option>
            <Option value="Por Hora">Por Hora</Option>
          </Select>
        </Form.Item>
        {tipoDeNomina === "Por Hora" ? (
          <Form.Item
            name="costoPorHora"
            label="Costo por hora"
            rules={[
              {
                required: true,
                message: "Introduce un contrato",
              },
            ]}
          >
            <Input />
          </Form.Item>
        ) : null}
        <Form.Item
          label="Sueldo Bruto"
          name="salarioBruto"
          rules={[
            {
              required: true,
              message: "Introduce el suedo bruto",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="departamento"
          label="Departamento"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Seleciona el tipo de Departamento">
            {returnOption(departamentosFinal)}
          </Select>
        </Form.Item>
        <Form.Item
          name="proyectoActual"
          label="Proyecto Actual"
          rules={[{ required: true, message: "Please select gender!" }]}
        >
          <Select placeholder="Seleciona el tipo de Departamento">
            {returnOption(opcionesProyectos)}
          </Select>
        </Form.Item>
        <Form.Item label="Estado Laboral" name="StatusLaboral">
          <Select placeholder="Seleciona el estado laboral">
            {returnOption(opcionesStatusArray)}
          </Select>
        </Form.Item>
        ,
        <Form.Item label="Comentario Estado" name="comentarioStatus">
          <Input />
        </Form.Item>
        ,
        <Form.Item name="puesto" label="Puesto">
          <Select placeholder="Seleciona el puesto">
            {returnOption(puestosFinalArray)}
          </Select>
        </Form.Item>
        <Form.Item
          name="equipos"
          label="Selecciona los equipos que maneja"
        >
          <Select placeholder="Selecciona el puesto" mode="multiple">
            {returnOption(equiposFinalArray)}
          </Select>
        </Form.Item>
        ,
        <Form.Item
          name="induccionFechaDeExpiracion"
          label="Expiración de Inducción "
        >
          <DatePicker />
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
            onChange={(e) => onSelectChange((e) => !e)}
          >
            {returnOption(opcionesLicenciaBolean)}
          </Select>
        </Form.Item>
        <Form.Item label="Fecha de Exp de Licencia" name="fechaDeExpiracion">
          <DatePicker disabled={selectChange ? false : true} />
        </Form.Item>
        <Form.Item label="Tipo De Licencia" name="tipoLicencia">
          <Select
            placeholder="Seleciona el tipo de Licencia"
            disabled={selectChange ? false : true}
          >
            {returnOption(opcionesLicenciaCategoria)}
          </Select>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Actualizar Empleado
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const stateMapToProps = (state) => {
  return {
    usuarioEditar: state.usuarioEditarSelecionado,
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
    puestos: state.puestos.puestos,
    equipos: state.Equipos.equipos,
    proyectos: state.Proyectos.proyectos,
  };
};

export default connect(stateMapToProps, {
  editarUsuario,
  CAMBIAR_ESTADO,
  GET_PUESTOS_ACTION,
})(CompanyModalEdit);
