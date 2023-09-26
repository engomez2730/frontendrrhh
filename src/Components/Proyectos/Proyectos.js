import React, { useState } from "react";
import { Button } from "antd";
import CustomModal from "../UI/CustomModal";
import TableProyecto from "./TableProyecto";
import { DiffOutlined } from "@ant-design/icons";
import CrearProyecto from "./CrearProyecto";

const Projectos = ({ proyectos }) => {
  const [EquiposLoaded, setIsEquiposLoaded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="equipos">
      <h1>
        <span style={{ marginRight: "14px" }}>Proyectos</span> <DiffOutlined />
      </h1>

      <div className="equiposContent">
        <Button type="primary" onClick={openModal} className="button">
          Crear Proyecto
        </Button>
        <TableProyecto proyectos={proyectos} loading={EquiposLoaded} />
      </div>

      <CustomModal
        open={modalVisible}
        onClose={closeModal}
        title="Crear Proyecto"
        width={800}
        content={<CrearProyecto onCloseModal={closeModal} />}
      />
    </div>
  );
};

export default Projectos;
