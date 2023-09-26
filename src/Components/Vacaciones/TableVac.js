import { Table, Button, Modal, Input, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { empleadoSelecionadoVer } from "../../actions/index";
import { usuarioEditarSeleciondo, editarUsuario } from "../../actions/index";
import { SearchOutlined } from "@ant-design/icons";
import EditarVacaciones from "./EditarVacaciones";
import VerVacaciones from "./VerVacaciones";
import moment from "moment";

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.empleados) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

  const showModal = () => {
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
      title: "Nombre",
      width: 170,
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
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
      width: 170,
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
      width: 150,
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "cedula",
      width: 150,
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 240,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Ver Vacaciones
        </Button>,
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Manejar Vacaciones
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModal();
  };

  const onClickModalVer = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModalEdit();
  };

  const empleados = props.empleados?.map((e) => {
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
      salario: e.salarioBruto,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      vacacionesTomadas: e.vacacionesTomadas,
      Vacaciones: e.Vacaciones,
      Nominas: e.Nominas,
      rol: e.rol,
      inicioLaboral: e.inicioLaboral,
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  return (
    <>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 6, total: empleados?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Manejar Vacaciones"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={750}
      >
        <EditarVacaciones usuario={props.usuarioSelecionado} />
      </Modal>
      <Modal
        title="Vacaciones del empleado"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
      >
        <VerVacaciones usuario={props.usuarioSelecionado} />
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
  empleadoSelecionadoVer,
  usuarioEditarSeleciondo,
  editarUsuario,
})(TableFinal);
