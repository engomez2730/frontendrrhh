import React, { useEffect, useState } from "react";
import { Card, List, Button, Modal } from "antd";
import { connect } from "react-redux";
import { GET_VACANTES_ACTION, VACANTE_SOLICITANTE } from "../../actions/index";

import "./Vacantes.css";

const VerVacantesPage = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (item) => {
    props.VACANTE_SOLICITANTE(item);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const data = props.vacantes?.map((e, key) => {
    return {
      title: e.nombre,
      puesto: e.puesto,
      personas: e.trabajadoresRequeridos,
      key: e._id,
    };
  });

  useEffect(() => {
    props.GET_VACANTES_ACTION();
  }, []);

  return (
    <div>
      <List
        grid={{ gutter: 16, column: 4 }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <Card title={item.title}>
              <h4>Puesto: {item.puesto}</h4>
              <h4>Personas Solicitadas: {item.personas}</h4>
              <Button type="primary" onClick={() => showModal(item)}>
                Postularme
              </Button>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    vacantes: state.Vacantes.vacantes,
    vacanteSolicitante: state.VacanteSolicitante.vacanteSolicitante,
  };
};

export default connect(mapStateToProps, {
  GET_VACANTES_ACTION,
  VACANTE_SOLICITANTE,
})(VerVacantesPage);
