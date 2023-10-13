import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { GET_DIMITIDOS_ACTION } from "../../actions/index";
import VerDimitido from "./VerDimitido";
import moment from "moment";
import Api from "../../apis/rrhhApi";

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.empleados) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const showModal = () => {
    setIsModalOpen(true);
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
      title: "Nombre",
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
      render: (value, record) => {
        return <>{`${record.nombre} ${record.apellido}`}</>;
      },
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "apellido",
      width: 200,
    },
    {
      title: "Celular",
      dataIndex: "celular",
      key: "celular",
      width: 200,
    },
    {
      title: "Puesto",
      dataIndex: "puesto",
      key: "celular",
      width: 200,
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "celular",
      width: 200,
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 160,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Demitido
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.GET_DIMITIDOS_ACTION(text.key);
    showModal();
  };

  const empleadosDimitidos = props?.empleados?.map((e) => {
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
      salarioBruto: e.salarioBruto,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      vacacionesTomadas: e.vacacionesTomadas,
      puesto: e.puesto,
      rol: e.rol,
    };
  });

  const empleadosActivos = empleadosDimitidos?.filter((e) => {
    return e.estado === false;
  });

  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 5, total: empleadosDimitidos?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Ver Permiso"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <VerDimitido Dimitido={props.dimitidosSelect} />
      </Modal>
      <Modal
        title="Editar Permiso"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
      <Modal
        title="Crear Permiso"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      ></Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    estado: state.cambiarState,
    dimitidosSelect: state.Dimitidos.Dimitidos,
  };
};

export default connect(StateMapToProps, {
  GET_DIMITIDOS_ACTION,
})(TablePerm);
