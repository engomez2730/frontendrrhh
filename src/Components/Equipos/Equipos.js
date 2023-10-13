import { Button } from "antd";
import { CarOutlined } from "@ant-design/icons";
import TableEquipos from "./TableEquipos";
import React from "react";
import { useEffect, useState } from "react";
import CustomModal from "../UI/CustomModal";
import CrearEquipo from "./CrearEquipo";
import requireAuth from "../requireAuth";

import "./Equipos.css";
const Equipos = ({ equipos }) => {
  const [EquiposLoaded, setIsEquiposLoaded] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (equipos) {
      setIsEquiposLoaded(false);
    }
  }, [equipos]);

  return (
    <div className="equipos">
      <h1>
        <span style={{ marginRight: "14px" }}>Equipos</span> <CarOutlined />
      </h1>

      <div className="equiposContent">
        <Button type="primary" onClick={openModal} className="button">
          Crear Equipo
        </Button>
        <TableEquipos equipos={equipos} loading={EquiposLoaded} />
      </div>

      <CustomModal
        open={modalVisible}
        onClose={closeModal}
        title="Crear Equipo"
        width={800}
        okText="Esta bien"
        cancelText="Cerrar"
        content={<CrearEquipo onCloseModal={closeModal} />}
      />
    </div>
  );
};

export default requireAuth(Equipos);
