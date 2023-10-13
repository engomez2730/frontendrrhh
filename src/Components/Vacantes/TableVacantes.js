import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { vacanteSelecionada } from "../../actions/index";
import CrearVacante from "./CrearVacante";
import VerVacante from "./verVacante";
import EditarVacante from "./editarVacante";
import moment from "moment";
moment.locale("uk");

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.vacantes) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
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
  const handleOkCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelVer = () => {
    setIsModalVerOpen(false);
  };
  const handleCancelCrear = () => {
    setIsModalVerOpenCrear(false);
  };

  const columns = [
    {
      title: "Nombre de la Vacante",
      width: 200,
      dataIndex: "nombre",
      key: "name",
      fixed: "left",
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => {
        return (
          <Input
            autoFocus={true}
            value={selectedKeys[0]}
            onChange={(e) => {
              setSelectedKeys(e.target.value ? [e.target.value] : []);
            }}
            onPressEnter={() => {
              confirm();
            }}
            onBlur={() => {
              confirm();
            }}
          ></Input>
        );
      },
      filterIcon: () => {
        return <SearchOutlined />;
      },
      onFilter: (value, record) => {
        return record.nombre.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Descripcion",
      dataIndex: "descripcion",
      key: "apellido",
    },
    {
      title: "Trabajadores Requeridos",
      dataIndex: "trabajadoresRequeridos",
      key: "cedula",
      width: 150,
    },
    {
      title: "Puesto",
      dataIndex: "puesto",
      key: "puesto",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 350,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Vacante
        </Button>,
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Manejar Vacante
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.vacanteSelecionada(text);
    showModal();
  };

  const onClickModalVer = (e, text) => {
    props.vacanteSelecionada(text);
    showModalEdit();
  };
  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  const vacantes = props?.vacantes?.map((e) => {
    return {
      nombre: e.nombre,
      descripcion: e.descripcion,
      trabajadoresRequeridos: e.trabajadoresRequeridos,
      puesto: e.puesto,
      createdAt: moment(e.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      estado: e.state,
      key: e.id,
    };
  });

  return (
    <div>
      <Button
        type="primary"
        key="crear"
        style={{ marginLeft: "10px", marginTop: "90px" }}
        onClick={(e) => onClickModalCrear(e)}
      >
        Crear Vacante
      </Button>
      ,
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={vacantes}
        bordered={true}
        pagination={{ pageSize: 5, total: vacantes?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Ver Vacante"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <VerVacante vacante={props.vacanteSelecionadaData} />
      </Modal>
      <Modal
        title="Editar Vacante"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <EditarVacante vacante={props.vacanteSelecionadaData} />
      </Modal>
      <Modal
        title="Crear Vacante"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <CrearVacante />
      </Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    vacanteSelecionadaData: state.VacanteSelecionada?.vacanteSelecionada,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  vacanteSelecionada,
})(TablePerm);
