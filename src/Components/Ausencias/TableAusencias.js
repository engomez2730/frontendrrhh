import { Table, Button, Modal, Input, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { cargarEmpleados } from "../../actions/index";
import { connect } from "react-redux";
import {
  empleadoSelecionadoVer,
  editarUsuario,
  CAMBIAR_ESTADO,
} from "../../actions/index";
import { SearchOutlined } from "@ant-design/icons";
import { CustomTable } from "../Custom/CustomTable";
import PonerAusencia from "./PonerAusencia";
import VerAusencias from "./VerAusencias";

const TableFinal = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalEditOpen] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.empleadosProps) {
      setIsEmpleadosLoaded(false);
    }
  }, [props.estado]);

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
      title: "Salario",
      dataIndex: "salarioBruto",
      key: "celular",
      render: (text) => {
        return new Intl.NumberFormat("es-DO").format(text || 0);
      },
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
          Ver Ausencias
        </Button>,
        <Button
          type="danger"
          key="editar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalEdit(e, text)}
        >
          Poner Ausencia
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModal();
  };
  const onClickModalEdit = (e, text) => {
    props.empleadoSelecionadoVer(text.key);
    showModalEdit();
  };

  const empleados = props?.empleadosProps?.map((e) => {
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
      expiracionDelContrato: e.expiracionDelContrato,
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
      inicioLaboral: e.inicioLaboral,
      buenaConductaFechaExpiracion: e.buenaConductaFechaExpiracion,
      Equipos: e.Equipos,
      induccionFechaDeExpiracion: e.induccionFechaDeExpiracion,
      analisisFechaDeExpiracion: e.analisisFechaDeExpiracion,
      tipoDeNomina: e.tipoDeNomina,
      costoPorHora: e.costoPorHora,
      proyectoActual: e.proyectoActual,
      comentarioStatus: e.comentarioStatus,
      StatusLaboral: e.StatusLaboral,
      historial: e.historial,
      Ausencias: e.Ausencias,
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
        loading={EmpleadosLoaded}
      />

      <Modal
        title="Ver Ausencias"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <VerAusencias empleado={props?.usuarioSelecionado} />
      </Modal>
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
          empleado={props?.usuarioSelecionado}
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
  editarUsuario,
  CAMBIAR_ESTADO,
})(TableFinal);
