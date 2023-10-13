import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import {
  GET_ENTREVISTADOS,
  CAMBIAR_ESTADO,
  ENTREVISTADOS_SELECIONADO_ACTION,
} from "../../actions/index";
import VerCandidato from "./verCandidato";
import EditarCandidato from "./editarCandidato";
import CrearEmpleado from "./CrearEmpleado";
import CrearCandidato from "./CrearCandidato";
import UploadDocument from "./UploadDocument";

const TablePerm = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenVer, setIsModalVerOpen] = useState(false);
  const [isModalOpenCrear, setIsModalVerOpenCrear] = useState(false);
  const [isModalOpenConvertir, setIsModalVerOpenConvertir] = useState(false);
  const [isModalOpenDocument, setIsModalVerOpenDocument] = useState(false);
  const [EmpleadosLoaded, setIsEmpleadosLoaded] = useState(true);

  useEffect(() => {
    if (props.entrevistados) {
      setIsEmpleadosLoaded(false);
    }
  }, [props?.estado]);

  const showModalDocument = (e, text) => {
    setIsModalVerOpenDocument(true);
    props.ENTREVISTADOS_SELECIONADO_ACTION(text);
  };

  const handleOkDocument = () => {
    setIsModalVerOpenDocument(false);
  };

  const handleCancelDocument = () => {
    setIsModalVerOpenDocument(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCrear = () => {
    setIsModalVerOpenCrear(true);
  };
  const showModalEdit = () => {
    setIsModalVerOpen(true);
  };
  const showModalConvertir = () => {
    setIsModalVerOpenConvertir(true);
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
  const handleOkConvertir = () => {
    setIsModalVerOpenConvertir(false);
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
  const handleCancelConvertir = () => {
    setIsModalVerOpenConvertir(false);
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
        return record?.nombre?.toLowerCase().includes(value.toLowerCase());
      },
    },
    {
      title: "Apellido",
      dataIndex: "apellido",
      key: "apellido",
    },
    {
      title: "Estado",
      dataIndex: "estadoLaboral",
      key: "estado",
    },
    {
      title: "Acción",
      key: "operation",
      fixed: "right",
      width: 700,
      render: (text) => [
        <Button
          type="primary"
          key="ver"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModal(e, text)}
        >
          Ver Candidato
        </Button>,
        <Button
          type="warning"
          key="manejar"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalVer(e, text)}
        >
          Manejar Candito
        </Button>,
        <Button
          type="warning"
          key="convertir"
          style={{ marginLeft: "10px" }}
          onClick={(e) => onClickModalConvert(e, text)}
        >
          Convertir en Empleado
        </Button>,
        <Button
          type="primary"
          key="convertir"
          style={{ marginLeft: "10px" }}
          onClick={(e) => showModalDocument(e, text)}
        >
          Subir Curriculum
        </Button>,
      ],
    },
  ];

  const onClickModal = (e, text) => {
    props.ENTREVISTADOS_SELECIONADO_ACTION(text);
    showModal();
  };

  const onClickModalVer = (e, text) => {
    props.ENTREVISTADOS_SELECIONADO_ACTION(text);
    showModalEdit();
  };

  const onClickModalConvert = (e, text) => {
    props.ENTREVISTADOS_SELECIONADO_ACTION(text);
    showModalConvertir();
  };
  const onClickModalCrear = (e, text) => {
    showModalCrear();
  };
  const entrevistados = props?.entrevistados?.map((e) => {
    return {
      nombre: e.nombre,
      apellido: e.apellido,
      cedula: e.cedula,
      direccion: e.direccion,
      celular: e.celular,
      correo: e.correo,
      estadoLaboral: e.estadoLaboral,
      provincia: e.provincia,
      pais: e.pais,
      vacanteAplicada: e.vacanteAplicada,
      licenciasDeConducir: e.licenciasDeConducir,
      tipoLicencia: e.tipoLicencia,
      licenciaDeConducirFechaExp: e.licenciaDeConducirFechaExp,
      key: e._id,
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
        Crear Candidato
      </Button>
      ,
      <Table
        style={{ marginTop: "50px", width: "90%" }}
        columns={columns}
        scroll={{ x: 1300 }}
        dataSource={entrevistados}
        bordered={true}
        pagination={{ pageSize: 5, total: entrevistados?.length }}
        loading={EmpleadosLoaded}
      />
      <Modal
        title="Ver Candidato"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <VerCandidato candidato={props?.candidatoSelecionado} />
      </Modal>
      <Modal
        title="Editar Candidato"
        open={isModalOpenVer}
        onOk={handleOkVER}
        onCancel={handleCancelVer}
        width={800}
      >
        <EditarCandidato
          candidato={props?.candidatoSelecionado}
          onClose={handleCancelVer}
        />
      </Modal>
      <Modal
        title="Crear Candidato"
        open={isModalOpenCrear}
        onOk={handleOkCrear}
        onCancel={handleCancelCrear}
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <CrearCandidato onCLose={handleCancelCrear} />
      </Modal>
      <Modal
        title="Convertir a empleado"
        open={isModalOpenConvertir}
        onOk={handleOkConvertir}
        onCancel={handleCancelConvertir}
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <CrearEmpleado onClose={handleCancelConvertir} />
      </Modal>
      <Modal
        title="Subir Curriculum"
        open={isModalOpenDocument}
        onOk={handleOkDocument}
        onCancel={handleCancelDocument}
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <UploadDocument candidato={props.candidatoSelecionado} />
      </Modal>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    entrevistados: state.entrevistados.entrevistados,
    estado: state.cambiarState,
    candidatoSelecionado: state.candidatoSelecionado.candidatoSelec,
  };
};

export default connect(StateMapToProps, {
  GET_ENTREVISTADOS,
  CAMBIAR_ESTADO,
  ENTREVISTADOS_SELECIONADO_ACTION,
})(TablePerm);
