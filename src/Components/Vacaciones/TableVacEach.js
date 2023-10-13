import { Table, Button, Modal, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { cargarEmpleados } from "../../actions/index";
import { connect } from "react-redux";
import { empleadoSelecionadoVer } from "../../actions/index";
import { usuarioEditarSeleciondo, editarUsuario } from "../../actions/index";
import EditarVacacionesCreadas from "./EdtarVacacionesCreadas";
import VerVacacionesEach from "./VerVacacionesEach";
import moment from "moment";
import "moment/locale/es"; // without this line it didn't work
moment.locale("es");

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [vacacion, vacacionSet] = useState();
  const [vacacionesSelecionada, vacacionesSelecionadaSet] = useState({});

  useEffect(() => {
    props.cargarEmpleados();
  }, [props.estado]);

  const showModal = (values) => {
    vacacionesSelecionadaSet(values);
    setIsModalOpen(true);
  };
  const showModalEdit = () => {
    setIsModalVerOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleOkVER = () => {
    setIsModalVerOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };

  const columns = [
    {
      title: "Año",
      width: 100,
      dataIndex: "estado",
      key: "name",
      render: (text, item) => {
        if (new Date(item?.tiempoDeVacaciones[0])?.getFullYear()) {
          return <>{new Date(item?.tiempoDeVacaciones[0])?.getFullYear()}</>;
        } else if (text) {
          return <>{}</>;
        }
        return <>{item?.tiempoDeVacaciones[0]}</>;
      },
    },
    {
      title: "Salario Por Vacaciones",
      dataIndex: "salarioPorVacaciones",
      key: "salarioPorVacaciones",
      width: 200,
      render: (text, item) => {
        return (
          <>
            {new Intl.NumberFormat("es-DO", {
              maximumSignificantDigits: 4,
            }).format(item.salarioPorVacaciones)}{" "}
            RD$
          </>
        );
      },
    },
    {
      title: "Dia de Vacaciones Tomados",
      dataIndex: "diasDeVacaciones",
      key: "diasDeVacaciones",
      width: 200,
    },
    {
      title: "Siguientes Vacaciones",
      dataIndex: "siguientesVacacionesFecha",
      key: "siguientesVacacionesFecha",
      width: 200,

      render: (text, item) => {
        if (text) {
          return <>{moment(text).format("MMMM Do YYYY")}</>;
        } else if (!text) {
          return <>{}</>;
        }
        return <>{item.tiempoDeVacaciones[0]}</>;
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 300,
      render: (text, values) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "0px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Ver Vacaciones
        </Button>,
        <Button
          /*           type="primary"
           */ key="editar"
          style={{ marginLeft: "5px" }}
          onClick={(e) => showModal(values)}
        >
          Editar Vacaciones
        </Button>,
      ],
    },
  ];

  const onClickModalVer = (e, text) => {
    vacacionSet(text);
    showModalEdit();
  };

  const vacaciones = props.vacaciones?.map((e) => {
    return {
      key: e._id,
      estado: e.estado,
      tiempoDeVacaciones: e.tiempoDeVacaciones,
      salarioPorVacaciones: e.salarioPorVacaciones,
      siguientesVacacionesFecha: e.siguientesVacacionesFecha,
      diasDeVacaciones: e.diasDeVacaciones,
      createdAt: e.createdAt,
    };
  });

  return (
    <>
      <Table
        style={{ marginTop: "50px", width: "100%" }}
        columns={columns}
        scroll={{ x: 800 }}
        dataSource={vacaciones}
        bordered={true}
        pagination={{ pageSize: 6, total: vacaciones?.length }}
      />
      <Modal
        title="Editar Vacaciones"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <EditarVacacionesCreadas
          vacaciones={vacacionesSelecionada}
          onClose={handleCancel}
          onCloseParent={props.onCloseParent}
        />
      </Modal>
      <Modal
        title="Vacaciones del empleado"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={900}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <VerVacacionesEach vacacion={vacacion} />
      </Modal>
    </>
  );
};

const stateMapToProps = (state) => {
  return {
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
})(TableFinal);
