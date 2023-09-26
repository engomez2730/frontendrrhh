import React from "react";
import { Badge, Button, Card } from "antd";
import NotificacionesList from "./NotificacionesList";
import requireAuth from "../requireAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";

const CardNotificacion = ({
  notificaciones,
  type,
  nombre,
  color,
  title,
  link,
  OnDashboard,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="contentNotification">
      {OnDashboard ? (
        <Link to={`${link}`}>
          <Badge.Ribbon text={nombre} color={color}>
            <Card
              title={title}
              size="small"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <NotificacionesList notificaciones={notificaciones} type={type} />
            </Card>
          </Badge.Ribbon>
        </Link>
      ) : (
        <div>
          <Button style={{ marginBottom: "10px" }} onClick={() => goBack()}>
            <ArrowLeftOutlined /> Volver
          </Button>

          <Badge.Ribbon text={nombre} color={color}>
            <Card
              title={title}
              size="small"
              style={{ maxHeight: "200px", overflowY: "auto" }}
            >
              <NotificacionesList notificaciones={notificaciones} type={type} />
            </Card>
          </Badge.Ribbon>
        </div>
      )}
    </div>
  );
};

export default requireAuth(CardNotificacion);
