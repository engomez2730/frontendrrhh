import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input, Popconfirm, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  CAMBIAR_ESTADO,
  cargarEmpleados,
  GET_NOMINASCOMPLETAS_ACTION,
  empleadoSelecionadoVer,
  NOMINAS_SELECIONADA,
} from "../../actions/index";
import CrearLinea from "./CrearLinea";
import Api from "../../apis/rrhhApi";
import CambiarEstado from "../NominaCompleta/CambiarEstado";
import moment from "moment";
import VerNomina from "./verNomina";

moment.locale("uk");

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);

  useEffect(() => {
    props.cargarEmpleados();
    props.GET_NOMINASCOMPLETAS_ACTION();
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
      width: 200,
      dataIndex: "nombre",
      key: "Nombre",
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
      width: 150,
    },
    {
      title: "Departamento",
      dataIndex: "departamento",
      key: "cedula",
      width: 150,
    },
    {
      title: "Estado",
      dataIndex: "Nominas",
      key: "cedula",
      width: 180,
      render: (text, item) => {
        const nominaMes = item.Nominas.find((e) => {
          return e.nombreNomina === props?.nominaCompletaSelect?.nombreNomina;
        });

        if (!nominaMes) {
          return (
            <Tag color="red" key={item._id}>
              Pendiente
            </Tag>
          );
        } else if (nominaMes) {
          return (
            <Tag color="Green" key={item._id}>
              Completado
            </Tag>
          );
        }

        return <></>;
      },
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 310,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Agregar Nomina
        </Button>,
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Ver Nomina
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    const nomina = text?.Nominas.find((e) => {
      return e.nombreNomina === props.nominaCompletaSelect.nombreNomina;
    });
    props.empleadoSelecionadoVer(text.key);
    props.NOMINAS_SELECIONADA(nomina);
    showModal();
  };
  const onClickModalVer = (e, text) => {
    const nomina = text?.Nominas.find((e) => {
      return e.nombreNomina === props.nominaCompletaSelect.nombreNomina;
    });
    props.empleadoSelecionadoVer(text.key);
    props.NOMINAS_SELECIONADA(nomina);
    showModalEdit();
  };
  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };

  const empleados = props.empleados?.map((e, index) => {
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
      salario: e.salarioBruto,
      departamento: e.departamento,
      expiracionDelContrato: e.vencimientoDelContrato,
      vacacionesTomadas: e.vacacionesTomadas,
      Nominas: e.Nominas,
    };
  });

  const empleadosActivos = empleados?.filter((e) => {
    return e.estado === true;
  });

  return (
    <div>
      <Table
        style={{ marginTop: "50px", width: "80%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={empleadosActivos}
        bordered={true}
        pagination={{ pageSize: 5, total: empleados?.length }}
      />
      <Modal
        title="Agregar Nomina"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
      >
        <CrearLinea />
      </Modal>
      <Modal
        title="Ver empleado nominado"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={1000}
      >
        <VerNomina />
      </Modal>
      <Modal
        title="Cambiar Estado"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={1000}
      >
        <CambiarEstado />
      </Modal>

      <Button type="primary" onClick={(e) => onClickModalCrear(e)}>
        Actualizar Estado Nomina
      </Button>
    </div>
  );
};
const StateMapToProps = (state) => {
  return {
    empleados: state.empleados.empleados,
    nominaCompletaSelect: state.nominaCompletaSelect.nominaCompletaSelect,
    empleadoSelecionado: state.usuarioSelecionadoVer.usuarioSelecionadoVer,
  };
};
export default connect(StateMapToProps, {
  CAMBIAR_ESTADO,
  cargarEmpleados,
  GET_NOMINASCOMPLETAS_ACTION,
  empleadoSelecionadoVer,
  NOMINAS_SELECIONADA,
})(TablePerm);
