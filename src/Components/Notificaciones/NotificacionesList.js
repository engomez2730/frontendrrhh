import React from "react";
import { Alert } from "antd";
import InfoNot from "./InfoNot";

const NotificacionesList = ({ notificaciones, type }) => {
  const showDays = (day) => {
    if (day <= 0) {
      return "hoy";
    } else {
      return `${day} dias`;
    }
  };

  if (!notificaciones) return null;

  return (
    <div>
      {notificaciones?.map((e) => {
        return (
          <div
            style={{ marginTop: "8px", textTransform: "uppercase" }}
            key={e.id}
          >
            {type === "cumpleanos" && (
              <Alert
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="cumpleanos"
                  />
                }
                type="success"
              />
            )}
            {type === "licenciaConducir" && (
              <Alert
                style={{ backgroundColor: "#BB7AF7", color: "#fff" }}
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="licenciaConducir"
                  />
                }
                type="error"
              />
            )}
            {type === "BuenaConducta" && (
              <Alert
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="BuenaConducta"
                  />
                }
                type="error"
              />
            )}
            {type === "induccion" && (
              <Alert
                style={{ backgroundColor: "#FAAD73" }}
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="induccion"
                  />
                }
                type="info"
              />
            )}
            {type === "Analisis" && (
              <Alert
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="Analisis"
                  />
                }
                type="info"
              />
            )}
            {type === "LicenciasNormales" && (
              <Alert
                style={{ backgroundColor: "#FF4141", color: "white" }}
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="LicenciasNormales"
                  />
                }
                type="info"
              />
            )}
            {type === "Vacaciones" && (
              <Alert
                style={{ backgroundColor: "#13c2c2", color: "white" }}
                className="mt-2"
                message={
                  <InfoNot
                    notificacion={e}
                    showDays={showDays}
                    type="Vacaciones"
                  />
                }
                type="info"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NotificacionesList;
