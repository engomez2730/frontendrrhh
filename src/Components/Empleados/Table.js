import { Table, Button, Modal, Input } from "antd";
import React, { useEffect, useState } from "react";
import { cargarEmpleados } from "../../actions/index";
import { connect } from "react-redux";
import InfoModal from "./infoModal";
import { empleadoSelecionadoVer } from "../../actions/index";
import {
  usuarioEditarSeleciondo,
  editarUsuario,
  CAMBIAR_ESTADO,
} from "../../actions/index";
import { SearchOutlined } from "@ant-design/icons";
import InfoModalEdit from "./InfoModalEdit";
import UploadPhoto from "./UploadPhoto";
import SubirFoto from "./SubirFoto";
import Loader from "../Utils/Loader";
import { CustomTable } from "../Custom/CustomTable";

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalEditOpen] = useState(false);
  const [isModalFoto, setisModalFoto] = useState(false);

  useEffect(() => {
    try {
      props.cargarEmpleados();
    } catch (err) {
    } finally {
    }
  }, [props.estado]);

  const showModalFoto = (e, text) => {
    setisModalFoto(true);
    props.empleadoSelecionadoVer(text.key);
  };

  const handleOkFoto = () => {
    setisModalFoto(false);
  };

  const handleCancelFoto = () => {
    setisModalFoto(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleOkEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
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
            size="large"
            autoFocus
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
      title: "Departamento",
      dataIndex: "departamento",
      key: "departamento",
      filters: [
        {
          text: "Administracion",
          value: "Administracion",
        },
        {
          text: "Inmobiliaria",
          value: "Inmobiliaria",
        },
      ],
      onFilter: (value, record) => {
        return record?.departamento?.indexOf(value) === 0;
      },
    },
    {
      title: "Telefono",
      dataIndex: "celular",
      key: "celular",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 450,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Empleado
        </Button>,
        <Button
          type="warning"
          key="editar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalEdit(e, text)}
        >
          Editar Empleado
        </Button>,
        <Button
          type="warning"
          key="editar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => showModalFoto(e, text)}
        >
          Subir Foto
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModal();
  };
  const onClickModalEdit = (e, text) => {
    props.usuarioEditarSeleciondo(text);
    /*     props.editarUsuario(text,text.key)
     */ showModalEdit();
  };

  const empleados = props?.empleadosProps?.map((e) => {
    return {
      nombre: e.nombre,
      apellido: e.apellido,
      correo: e.correo,
      celular: e.celular,
      cedula: e.cedula,
      departamento: e.cedula,
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
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true && e.rol === "empleado";
  });

  return (
    <>
      <CustomTable
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 6, total: empleados?.length }}
      />
      <Modal
        title="Informacion del Empleado"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <InfoModal />
      </Modal>
      <Modal
        title="Editar el Empleado"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={1000}
      >
        <InfoModalEdit />
      </Modal>
      <Modal
        title="Subir Foto del empleado"
        open={isModalFoto}
        onOk={handleOkFoto}
        onCancel={handleCancelFoto}
        width={1000}
      >
        <UploadPhoto empleado={props.usuarioSelecionado} />
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
