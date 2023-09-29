import React from "react";
import CardNotificacion from "./CardNotificacion";
import requireAuth from "../requireAuth";
import "./Not.css";

const Notificaciones = ({
  notificacionesCompleaños,
  notificacionesLicencias,
  notificacionesBuenaConducta,
  notificacionesInduccion,
  notificacionesAnalisis,
  LicenciasNormalesFilter,
  vacacionesNOtificaciones,
}) => {
  return (
    <div className="notificaciones">
      <h1>Notificaciones</h1>
      <div className="parentNotifications">
        <CardNotificacion
          notificaciones={notificacionesCompleaños}
          type="cumpleanos"
          nombre="Cumpleaños"
          color="green"
          title="Empleados que estan cerca de cumplir años"
          link="/notificaciones/cumpleanos"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={notificacionesLicencias}
          type="licenciaConducir"
          nombre="Licencias de Conducir"
          color="purple"
          title="Licencias de conducir proximas a vencer"
          link="/notificaciones/licenciasdeconducir"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={notificacionesInduccion}
          type="induccion"
          nombre="Induccion"
          color="orange"
          title="Papeles de Inducción proximas a vencer"
          link="/notificaciones/induccion"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={notificacionesBuenaConducta}
          type="BuenaConducta"
          nombre="Papeles de buena conducta"
          color="pink"
          title="Papeles de buena conducta proximos a vencer"
          link="/notificaciones/papelbuenaconducta"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={notificacionesAnalisis}
          type="Analisis"
          nombre="Analisis"
          color="blue"
          title="Analisis proximos a vencer"
          link="/notificaciones/analisis"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={LicenciasNormalesFilter}
          type="LicenciasNormales"
          nombre="Licencias Normales"
          color="red"
          title="Licencias proximas a vencer"
          link="/notificaciones/licenciasnormales"
          OnDashboard={true}
        />
        <CardNotificacion
          notificaciones={vacacionesNOtificaciones}
          type="Vacaciones"
          nombre="Vacaciones Normales"
          color="cyan"
          title="Licencias proximas a vencer"
          link="/notificaciones/vacaciones"
          OnDashboard={true}
        />
      </div>
    </div>
  );
};

export default requireAuth(Notificaciones);
