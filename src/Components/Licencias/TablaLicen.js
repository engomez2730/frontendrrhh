import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { CAMBIAR_ESTADO, empleadoSelecionadoVer } from "../../actions/index";
import VerLicencias from "./VerLicencias";
import CrearLicencia from "./CrearLicencia";

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
      title: "Nombre",
      width: 100,
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
      title: "Cedula",
      dataIndex: "cedula",
      key: "apellido",
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "cedula",
    },
    {
      title: "Puesto",
      dataIndex: "puesto",
      key: "Puesto",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 370,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Licencias
        </Button>,
        <Button
          type=""
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Crear Licencia
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModal();
  };

  /*   const eliminaranuncio = async (e,text) =>{
    const res = await Api.delete(`permisos/${text.key}`)
    props.CAMBIAR_ESTADO(!props.estado)
  }
 */
  const onClickModalVer = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModalEdit();
  };
  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  console.log(props);

  const empleados = props.empleados?.empleados?.map((e) => {
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
      sueldoFijo: e.sueldoFijo,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      Incentivos: e.Incentivos,
      puesto: e.puesto,
      Licencias: e.Licencias,
      rol: e.rol,
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 5, total: empleadosActivos?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Ver Licencia"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <VerLicencias />
      </Modal>
      <Modal
        title="Crear Licencia"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
      >
        <CrearLicencia />
      </Modal>
      <Modal
        title="Crear Licencia"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
      ></Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    permisoSelecioandoData: state.permisoSelecionado,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {
  empleadoSelecionadoVer,
  CAMBIAR_ESTADO,
})(TablePerm);
