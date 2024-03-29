import { Table, Button, Modal, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { cargarEmpleados } from "../../actions/index";
import Api from "../../apis/rrhhApi";
import { connect } from "react-redux";
import { empleadoSelecionadoVer } from "../../actions/index";
import {
  usuarioEditarSeleciondo,
  editarUsuario,
  BUSCADOR_EMPLEADOS_GET,
} from "../../actions/index";

import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");

const TableFinal = (props) => {
  useEffect(() => {}, [props.estado]);

  const onClickBuscador = async (e, text) => {
    console.log(text);
    try {
      const empleadoEditadp = await Api.patch(`empleados/${text.key}`, {
        rol: "encargado",
      });
      props.onCancel();

      console.log(empleadoEditadp);
    } catch (err) {
      console.log(err);
    }
  };

  const columns = [
    {
      title: "Nombre",
      width: 80,
      dataIndex: "nombre",
      key: "name",
    },
    {
      title: "apellido",
      dataIndex: "apellido",
      key: "cedula",
      width: 80,
    },

    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 70,
      render: (text) => [
        <Button
          type="warning"
          key="editar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickBuscador(e, text)}
        >
          Convertir en Moderador
        </Button>,
      ],
    },
  ];

  const empleadosFinal = props.empleados?.map((e) => {
    return {
      nombre: e.nombre,
      apellido: e.apellido,
      correo: e.correo,
      celular: e.celular,
      cedula: e.cedula,
      key: e.id,
      DiaDeVacaciones: e.DiaDeVacaciones,
      PrestacionesLaborales: e.PrestacionesLaborales,
      ausencias: e.ausencias,
      contrato: e.contrato,
      createdAt: e.createdAt,
      direccion: e.direccion,
      estado: e.estado,
      pais: e.pais,
      provincia: e.provincia,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      vacacionesTomadas: e.vacacionesTomadas,
      licenciasDeConducir: e.licenciasDeConducir,
      tipoLicencia: e.tipoLicencia,
      licenciaDeConducirFechaExp: e.licenciaDeConducirFechaExp,
      contactoDeEmergencia: e.contactoDeEmergencia,
      puesto: e.puesto,
      photo: e.photo,
      fechaDeNacimieno: e.fechaDeNacimiento,
      salarioBruto: e.salarioBruto,
      rol: e.rol,
      Vacaciones: e.Vacaciones,
      Nominas: e.Nominas,
      Licencias: e.Licencias,
      Epps: e.Epps,
      Despidos: e.Despidos,
      Beneficios: e.Beneficios,
      Amonestaciones: e.Amonestaciones,
    };
  });

  return (
    <>
      <Table
        style={{ marginTop: "50px", width: "100%" }}
        columns={columns}
        dataSource={empleadosFinal}
        bordered={true}
      />
    </>
  );
};

const stateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
  };
};

export default connect(stateMapToProps, {
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario,
  BUSCADOR_EMPLEADOS_GET,
})(TableFinal);
