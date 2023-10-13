import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";

import {
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  BookOutlined,
  CheckOutlined,
  CalendarOutlined,
  LineChartOutlined,
  SnippetsOutlined,
  MinusCircleOutlined,
  CloseOutlined,
  UserSwitchOutlined,
  SearchOutlined,
  MinusOutlined,
  CarOutlined,
  DiffOutlined,
  ControlOutlined,
  PushpinOutlined,
  UpSquareOutlined,
  AuditOutlined,
  ClearOutlined,
  FieldTimeOutlined,
  DeleteOutlined,
  ExclamationOutlined,
} from "@ant-design/icons";

export const elementos = [
  {
    nombre: "Empleados",
    icon: UserOutlined,
    childrens: [
      {
        key: "buscarEmpleado",
        label: <Link to="/buscarempleados">Buscar Empleado</Link>,
        icon: React.createElement(SearchOutlined),
      },
      {
        key: "crearEmpleado",
        label: <Link to="/crearempleado">Crear Empleado</Link>,
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "verEmpleado",
        label: <Link to="/verempleados">Manejar Empleados</Link>,
        icon: React.createElement(UserSwitchOutlined),
      },
      {
        key: "vacacionesEmpleados",
        label: <Link to="/vacaciones">Manejar Vacaciones</Link>,
        icon: React.createElement(CalendarOutlined),
      },
      {
        key: "compensacionesEmpleados",
        label: <Link to="/compensaciones">Compensaciones</Link>,
        icon: React.createElement(CheckOutlined),
      },
      {
        key: "AmonestacionesEmpleados",
        label: <Link to="/amonestaciones">Amonestaciones</Link>,
        icon: React.createElement(CloseOutlined),
      },
      {
        key: "Licencias",
        label: <Link to="/licencias">Licencias</Link>,
        icon: React.createElement(UpSquareOutlined),
      },
      {
        key: "Ausencias",
        label: <Link to="/ausencias">Ausencias</Link>,
        icon: React.createElement(ExclamationOutlined),
      },
      {
        key: "dimitidosEmpleados",
        label: <Link to="/dimitidos">Empleados Dimitidos</Link>,
        icon: React.createElement(DeleteOutlined),
      },
      {
        key: "perimisosEmpleados",
        label: <Link to="/permisos">Manejar Perimisos</Link>,
        icon: React.createElement(PushpinOutlined),
      },
      {
        key: "statsempleado",
        label: <Link to="/stats">Estadisticas</Link>,
        icon: React.createElement(LineChartOutlined),
      },
    ],
  },
  {
    nombre: "Candidatos",
    icon: BookOutlined,
    childrens: [
      {
        key: "crearCandidato",
        label: <Link to="/candidatos">Manejar candidato</Link>,
        icon: React.createElement(BookOutlined),
      },
    ],
  },
  {
    nombre: "Notificaciones",
    icon: NotificationOutlined,
    label: <Link to="/notificaciones">Manejar Vacantes</Link>,
    childrens: [
      {
        key: "Notificaciones",
        label: <Link to="/notificaciones">Panel de Notificaciones</Link>,
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "NotificacionesLicencia",
        label: (
          <Link to="/notificaciones/licenciasdeconducir">
            Licencias de conducir
          </Link>
        ),
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "NotificacionesLicenciasNormals",
        label: (
          <Link to="/notificaciones/licenciasnormales">Licencias Normales</Link>
        ),
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "NotificacionesPapel",
        label: (
          <Link to="/notificaciones/papelbuenaconducta">
            Papel Buena Conducta
          </Link>
        ),
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "Cumpleaños",
        label: <Link to="/notificaciones/cumpleanos">Cumpleaños</Link>,
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "Inducción",
        label: <Link to="/notificaciones/induccion">Inducción</Link>,
        icon: React.createElement(NotificationOutlined),
      },
      {
        key: "Análisis",
        label: <Link to="/notificaciones/analisis">Análisis</Link>,
        icon: React.createElement(NotificationOutlined),
      },
    ],
  },
  {
    nombre: "Departamentos",
    icon: HomeOutlined,
    childrens: [
      {
        key: "verDepartamento",
        label: <Link to="/verdepartamentos">Manejar Departamentos</Link>,
        icon: React.createElement(HomeOutlined),
      },
    ],
  },
  {
    nombre: "Proyectos",
    icon: DiffOutlined,
    childrens: [
      {
        key: "verRpoyectos",
        label: <Link to="/proyectos">Manejar Proyectos</Link>,
        icon: React.createElement(DiffOutlined),
      },
    ],
  },
  {
    nombre: "Puestos",
    icon: AuditOutlined,
    childrens: [
      {
        key: "Manejar Puestos",
        label: <Link to="/puestos">Manejar Puestos</Link>,
        icon: React.createElement(AuditOutlined),
      },
    ],
  },
  {
    nombre: "Equipos",
    icon: CarOutlined,
    childrens: [
      {
        key: "Manejar Equipos",
        label: <Link to="/equipos">Manejar Equipos</Link>,
        icon: React.createElement(CarOutlined),
      },
    ],
  },

  {
    nombre: "Despidos",
    icon: ClearOutlined,
    childrens: [
      {
        key: "verDespidos",
        label: <Link to="/despidos">Manejar Despidos</Link>,
        icon: React.createElement(ClearOutlined),
      },
      {
        key: "Crear Despido",
        label: <Link to="/despidosver">Generar Despido</Link>,
        icon: React.createElement(ClearOutlined),
      },
    ],
  },
  {
    nombre: "Vacantes",
    icon: NotificationOutlined,
    childrens: [
      {
        key: "crearVacante",
        label: <Link to="/vacantes">Manejar Vacantes</Link>,
        icon: React.createElement(NotificationOutlined),
      },
    ],
  },
  {
    nombre: "Epp",
    icon: FieldTimeOutlined,
    childrens: [
      {
        key: "ManejarEpp",
        label: <Link to="/epp">Manejar EPP</Link>,
        icon: React.createElement(FieldTimeOutlined),
      },
    ],
  },
  {
    nombre: "Reportes",
    icon: ControlOutlined,
    childrens: [
      {
        key: "ManejarReportes",
        label: <Link to="/reportesdiarios">Reportes Diarios</Link>,
        icon: React.createElement(ControlOutlined),
      },
      {
        key: "reportesTotal",
        label: <Link to="/reportes">Reportes</Link>,
        icon: React.createElement(ControlOutlined),
      },
      {
        key: "reportesAusencias",
        label: <Link to="/reportesausencias">Reportes de Ausencias</Link>,
        icon: React.createElement(ControlOutlined),
      },
    ],
  },
];

export const items2 = elementos.map((element, index) => {
  return {
    key: element.nombre,
    icon: React.createElement(element.icon),
    label: `${element.nombre}`,
    children: element.childrens,
  };
});
