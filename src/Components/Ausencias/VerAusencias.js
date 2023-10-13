import { Table, Button, Modal, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { cargarEmpleados } from "../../actions/index";
import { connect } from "react-redux";
import { empleadoSelecionadoVer } from "../../actions/index";
import {
  usuarioEditarSeleciondo,
  editarUsuario,
  CAMBIAR_ESTADO,
} from "../../actions/index";
import { CustomTable } from "../Custom/CustomTable";
import PonerAusencia from "./PonerAusencia";
import moment from "moment";

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalEditOpen] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.empleado) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  const columns = [
    {
      title: "Razón",
      dataIndex: "razon",
      key: "name",
      fixed: "left",
    },
    {
      title: "Fecha",
      dataIndex: "fecha",
      key: "fecha",
      render: (value) => {
        return moment(value).format("MMMM Do YYYY");
      },
    },
  ];

  return (
    <>
      <CustomTable
        style={{ marginTop: "50px", width: "100%" }}
        columns={columns}
        dataSource={props.empleado?.Ausencias}
        bordered={true}
        pagination={{ pageSize: 6, total: props.empleado?.length }}
        loading={EmpleadosLoaded}
      />

      <Modal
        title="Ver Ausencias"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
      <Modal
        title="Poner Ausencias"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <PonerAusencia
          onClose={handleCancelEdit}
          empleado={props.usuarioSelecionado}
        />
      </Modal>
    </>
  );
};

const stateMapToProps = (state) => {
  return {
    empleados: state.empleados,
    usuarioFinal: state.usuarioEditadoFinal,
    estado: state.cambiarState,
    usuarioSelecionado: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
  };
};

export default connect(stateMapToProps, {
  cargarEmpleados,
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario,
  CAMBIAR_ESTADO,
})(TableFinal);
