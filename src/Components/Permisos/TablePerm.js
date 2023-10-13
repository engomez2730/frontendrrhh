import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  GET_PERMISOS_STATE,
  CAMBIAR_ESTADO,
  permisoSelecionado,
  empleadoSelecionadoVer,
} from "../../actions/index";
import PermisoVer from "./PermisoVer";
import PermisoCrear from "./PermisoCrear";

const TablePerm = (props) => {
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
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Cedula",
      dataIndex: "cedula",
      key: "cedula",
    },
    {
      title: "departamento",
      dataIndex: "departamento",
      key: "cedula",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 340,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Permiso
        </Button>,
        <Button
          type=""
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Crear Permiso
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text?.key);
    showModal();
  };

  const onClickModalVer = (e, text) => {
    props.empleadoSelecionadoVer(text?.key);
    showModalEdit();
  };

  const empleados = props?.empleados?.map((e) => {
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
      Permisos: e.Permisos,
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  return (
    <div>
      ,
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
        title="Ver Permiso"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <PermisoVer usuario={props.usuarioSelecionado?.usuarioSelecionadoVer} />
      </Modal>
      <Modal
        title="Crear Permiso"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
        okText="Esta bien"
        cancelText='Cerrar'
      >
        <PermisoCrear
          usuario={props.usuarioSelecionado?.usuarioSelecionadoVer}
          onCLose={handleCancelVer}
        />
      </Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    permisos: state.permisos.permisos,
    permisoSelecioandoData: state.permisoSelecionado,
    estado: state.cambiarState,
    usuarioSelecionado: state.usuarioSelecionadoVer,
  };
};

export default connect(StateMapToProps, {
  GET_PERMISOS_STATE,
  permisoSelecionado,
  CAMBIAR_ESTADO,
  empleadoSelecionadoVer,
})(TablePerm);
