import React, { useState } from "react";
import { Drawer, List, Button } from "antd";
import { connect } from "react-redux";
import DeparInfo from "./DeparInfo";
import DeparEmpleados from "./DeparEmpleados";

const VerDepartamento = (props) => {
  const [open, setOpen] = useState(false);
  const [showData, setShowData] = useState(1);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const onDataChange = (item) => {
    showDrawer();
    setShowData(item.id);
  };

  const renderData = () => {
    if (showData === 1) {
      return <DeparInfo departamento={props.departamento} />;
    } else {
      return <DeparEmpleados departamento={props.departamento} />;
    }
  };

  return (
    <div>
      <List
        dataSource={[
          {
            id: 1,
            name: "Ver Informacion del Departamento",
            description: "Nombre, Encargado, Descripcion",
          },
          {
            id: 2,
            name: "Ver Empleados de este departamento",
            description: "Empleados del departamento",
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={() => onDataChange(item)} key={`a-${item.id}`}>
                Ver información
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={<a href="https://ant.design/index-cn">{item.name}</a>}
              description={item.description}
            />
          </List.Item>
        )}
      />
      <Drawer
        width={640}
        placement="right"
        closable={false}
        onClose={onClose}
        open={open}
      >
        {renderData()}
      </Drawer>
    </div>
  );
};

export default connect(null, {})(VerDepartamento);
