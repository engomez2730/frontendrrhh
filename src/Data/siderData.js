import React from "react";
import { Link } from "react-router-dom";
import {
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  PlusCircleOutlined,
  EyeOutlined,
  BookOutlined,
  BellOutlined,
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
        icon: React.createElement(EyeOutlined),
      },
      {
        key: "vacacionesEmpleados",
        label: <Link to="/vacaciones">Manejar Vacaciones</Link>,
        icon: React.createElement(SnippetsOutlined),
      },
      {
        key: "compensacionesEmpleados",
        label: <Link to="/compensaciones">Compensaciones</Link>,
        icon: React.createElement(SnippetsOutlined),
      },
      {
        key: "AmonestacionesEmpleados",
        label: <Link to="/amonestaciones">Amonestaciones</Link>,
        icon: React.createElement(SnippetsOutlined),
      },
      {
        key: "Licencias",
        label: <Link to="/licencias">Licencias</Link>,
        icon: React.createElement(SnippetsOutlined),
      },
      {
        key: "dimitidosEmpleados",
        label: <Link to="/dimitidos">Empleados Dimitidos</Link>,
        icon: React.createElement(MinusOutlined),
      },
      {
        key: "perimisosEmpleados",
        label: <Link to="/permisos">Manejar Perimisos</Link>,
        icon: React.createElement(MinusCircleOutlined),
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
        icon: React.createElement(PlusCircleOutlined),
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
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "NotificacionesLicencia",
        label: (
          <Link to="/notificaciones/licenciasdeconducir">
            Licencias de conducir
          </Link>
        ),
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "NotificacionesLicenciasNormals",
        label: (
          <Link to="/notificaciones/licenciasnormales">Licencias Normales</Link>
        ),
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "NotificacionesPapel",
        label: (
          <Link to="/notificaciones/papelbuenaconducta">
            Papel Buena Conducta
          </Link>
        ),
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "Cumpleaños",
        label: <Link to="/notificaciones/cumpleanos">Cumpleaños</Link>,
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "Inducción",
        label: <Link to="/notificaciones/induccion">Inducción</Link>,
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "Análisis",
        label: <Link to="/notificaciones/analisis">Análisis</Link>,
        icon: React.createElement(PlusCircleOutlined),
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
        icon: React.createElement(PlusCircleOutlined),
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
    icon: HomeOutlined,
    childrens: [
      {
        key: "Manejar Puestos",
        label: <Link to="/puestos">Manejar Puestos</Link>,
        icon: React.createElement(PlusCircleOutlined),
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
    icon: CloseOutlined,
    childrens: [
      {
        key: "verDespidos",
        label: <Link to="/despidos">Manejar Despidos</Link>,
        icon: React.createElement(PlusCircleOutlined),
      },
      {
        key: "Crear Despido",
        label: <Link to="/despidosver">Generar Despido</Link>,
        icon: React.createElement(EyeOutlined),
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
        icon: React.createElement(PlusCircleOutlined),
      },
    ],
  },
  {
    nombre: "Epp",
    icon: UserSwitchOutlined,
    childrens: [
      {
        key: "ManejarEpp",
        label: <Link to="/epp">Manejar EPP</Link>,
        icon: React.createElement(UserSwitchOutlined),
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
        key: "reportesDepartamentos",
        label: <Link to="/reportes">Reportes Departamentos</Link>,
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
