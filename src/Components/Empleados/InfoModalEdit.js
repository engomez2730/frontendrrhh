import { Avatar, Button, Col, Divider, Drawer, List, Row } from "antd";
import React, { useState } from "react";
import InfoForm from "./InfoForm";
import CompanyModalEdit from "./CompanyModalEdit";

const InfoModalEdit = () => {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);

  const showDrawer = (id) => {
    setPage(id);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const renderComponents = () => {
    if (page === 1) {
      return <InfoForm />;
    } else {
      return <CompanyModalEdit />;
    }
  };

  return (
    <div>
      <List
        dataSource={[
          {
            id: 1,
            name: "Editar Informacion Personal",
          },
          {
            id: 2,
            name: "Editar Informacion Laboral",
          },
        ]}
        bordered
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button onClick={(e) => showDrawer(item.id)} key={`a-${item.id}`}>
                Editar Info
              </Button>,
            ]}
          >
            <List.Item.Meta title={item.name} description="Nombre, etc" />
          </List.Item>
        )}
      />
      <Drawer
        width={940}
        placement="right"
        closable={true}
        onClose={onClose}
        open={open}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        {renderComponents()}
      </Drawer>
    </div>
  );
};

export default InfoModalEdit;
