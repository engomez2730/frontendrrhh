import React, { useEffect } from "react";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.min.css";
import Header from "./Pages/header";
import Sider from "./Empleados/Sidebar";
import Form from "./Empleados/Form";
import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import {
  setUser,
  loggedUserIn,
  loggedUserOut,
  cargarEmpleados,
  cargarDepartamentos,
  GET_PUESTOS_ACTION,
  GET_ENTREVISTADOS,
  GET_VACANTES_ACTION,
  CARGAR_EQUIPOS_ACTION,
  CARGAR_PROYECTOS_FUNCTION,
} from "../actions";
import Login from "../Components/Pages/login";
import VerEmpleados from "./Empleados/VerEmpleados";
import Inicio from "./Pages/Inicio";
import VerDepartamentos from "../Components/Departamentos/VerDepartamentos";
import Vacaciones from "./Vacaciones/Vacaciones.js";
import Permisos from "./Permisos/Permisos";
import Avisos from "./Avisos/Avisos";
import Vacantes from "./Vacantes/vacantes";
import VerVacantesPage from "./Vacantes/verVacantesPage";
import Candidatos from "./Candidato/Candidato";
import CrearDespidos from "./Despidos/CrearDespido";
import Despidos from "./Despidos/CrearDespido";
import DespidosVer from "./Despidos/TableDespidos";
import Epp from "./Epp/Epp";
import Puesto from "./Puestos/Puesto";
import EmpleadoPage from "./Pages/EmpleadoPage";
import Buscador from "./Buscador/Buscador";
import Dimitidos from "./Dimitidos/Dimitidos";
import Compensaciones from "./Compensaciones/Compensaciones";
import Licencias from "./Licencias/Licencias";
import Amonestaciones from "./Amonestaciones/Amonestaciones";
import Stats from "./Stats/Stats";
import Print from "./Print/Print";
import Perfil from "./Perfil/Perfil";
import Reportes from "./Reportes/Reportes";
import {
  calculateDaysUntilNextBirthday,
  calculateDaysUntilLicenseExpiry,
  calculateDaysUntilPaperConducta,
  calculateDaysUntilInduccion,
  calculateDaysUntilAnalisis,
  calculateLicencias,
  calculateVacacionesDays,
} from "./Utils/CumpleañosFunction";
import Notificaciones from "./Notificaciones/Notificaciones";
import Equipos from "./Equipos/Equipos";
import CardNotificacion from "./Notificaciones/CardNotificacion";
import Proyectos from "./Proyectos/Proyectos";
import ReportesDiarios from "./ReportesDiarios/ReportesDiarios";
const { Content } = Layout;

const App = (props) => {
  console.log("Hola from APP js");

  useEffect(() => {
    props.cargarEmpleados();
    props.cargarDepartamentos();
    props.GET_PUESTOS_ACTION();
    props.GET_ENTREVISTADOS();
    props.GET_VACANTES_ACTION();
    props.CARGAR_EQUIPOS_ACTION();
    props.CARGAR_PROYECTOS_FUNCTION();
  }, [props.estado]);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal && userLocal.rol === "admin") {
      props.loggedUserIn();
      props.setUser(userLocal);
    }
  }, []);

  // Replace with the actual birthdate
  const avisosCumpleaños = props.empleados?.empleados?.map((empleado) => {
    return calculateDaysUntilNextBirthday(empleado, empleado.fechaDeNacimiento);
  });

  const avisosLicenciaDeConducir = props.empleados?.empleados?.map(
    (empleado) => {
      return calculateDaysUntilLicenseExpiry(
        empleado,
        empleado.licenciaDeConducirFechaExp
      );
    }
  );

  const notificacionesLicenciasDeConducir = avisosLicenciaDeConducir?.filter(
    (element) => {
      // Filter out elements that are either false or have the role as "admin"
      return element !== false && element.rol !== "admin";
    }
  );

  const notificacionesCumpleaños = avisosCumpleaños?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const avisosBuenaConducta = props.empleados?.empleados?.map((empleado) => {
    return calculateDaysUntilPaperConducta(
      empleado,
      empleado.buenaConductaFechaExpiracion
    );
  });

  const avisosBuenaConductaFilter = avisosBuenaConducta?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const avisosBuenaInduccion = props.empleados?.empleados?.map((empleado) => {
    return calculateDaysUntilInduccion(
      empleado,
      empleado.induccionFechaDeExpiracion
    );
  });

  const avisosInduccionFilter = avisosBuenaInduccion?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const avisosAnalisis = props.empleados?.empleados?.map((empleado) => {
    return calculateDaysUntilAnalisis(
      empleado,
      empleado.analisisFechaDeExpiracion
    );
  });

  const avisosAnalisisFilter = avisosAnalisis?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const LicenciasNormales = props.empleados?.empleados?.map((empleado) => {
    return calculateLicencias(
      empleado,
      empleado?.Licencias[empleado?.Licencias.length - 1]?.tiempoDeLicencia[1]
    );
  });

  const LicenciasNormalesFilter = LicenciasNormales?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const VacacionesNot = props.empleados?.empleados?.map((empleado) => {
    return calculateVacacionesDays(
      empleado,
      empleado?.Vacaciones[empleado?.Vacaciones.length - 1]
        ?.siguientesVacacionesFecha
    );
  });

  const VacacionesFilter = VacacionesNot?.filter((element) => {
    // Filter out elements that are either false or have the role as "admin"
    return element !== false && element.rol !== "admin";
  });

  const USER = JSON.parse(localStorage.getItem("user"));

  const renderSider = () => {
    if (props?.isLoggedIn?.isLoggedIn && USER?.rol === "admin") {
      return <Sider />;
    } else if (props?.isLoggedIn?.isLoggedIn && USER?.rol === "empleado") {
      return <EmpleadoPage />;
    }
  };

  return (
    <div>
      <Layout>
        <Header
          notificaciones={
            notificacionesCumpleaños?.length +
            notificacionesLicenciasDeConducir?.length +
            avisosInduccionFilter?.length +
            avisosBuenaConductaFilter?.length +
            avisosAnalisisFilter?.length +
            VacacionesFilter?.length +
            LicenciasNormalesFilter?.length
          }
        />
        <Layout>
          {renderSider()}
          <Layout style={{ padding: "0 14px 14px" }}>
            <Content
              className="site-layout-background"
              style={{ padding: 50, margin: "20px 0px", minHeight: "85vh" }}
            >
              <Routes>
                <Route path="/" element={<Inicio />}></Route>
                <Route
                  path="/notificaciones"
                  element={
                    <Notificaciones
                      notificacionesCompleaños={notificacionesCumpleaños}
                      notificacionesLicencias={
                        notificacionesLicenciasDeConducir
                      }
                      notificacionesBuenaConducta={avisosBuenaConductaFilter}
                      notificacionesInduccion={avisosInduccionFilter}
                      notificacionesAnalisis={avisosAnalisisFilter}
                      LicenciasNormalesFilter={LicenciasNormalesFilter}
                      vacacionesNOtificaciones={VacacionesFilter}
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/vacaciones"
                  element={
                    <CardNotificacion
                      notificaciones={VacacionesFilter}
                      type="Vacaciones"
                      nombre="Vacaciones Normales"
                      color="cyan"
                      title="Licencias proximas a vencer"
                      link="/notificaciones/licenciasnormales"
                      OnDashboard={true}
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/cumpleanos"
                  element={
                    <CardNotificacion
                      notificaciones={notificacionesCumpleaños}
                      type="cumpleanos"
                      nombre="Cumpleaños"
                      color="green"
                      title="Empleados que estan cerca de cumplir años"
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/licenciasnormales"
                  element={
                    <CardNotificacion
                      notificaciones={LicenciasNormalesFilter}
                      type="LicenciasNormales"
                      nombre="Licencias "
                      color="red"
                      title="Licencias proximas a vencer"
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/licenciasdeconducir"
                  element={
                    <CardNotificacion
                      notificaciones={notificacionesLicenciasDeConducir}
                      type="licenciaConducir"
                      nombre="Licencias de Conducir"
                      color="purple"
                      title="Licencias de conducir proximas a vencer"
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/induccion"
                  element={
                    <CardNotificacion
                      notificaciones={avisosInduccionFilter}
                      type="induccion"
                      nombre="Induccion"
                      color="orange"
                      title="Papeles de Inducción proximas a vencer"
                    />
                  }
                ></Route>
                <Route
                  path="/notificaciones/papelbuenaconducta"
                  element={
                    <CardNotificacion
                      notificaciones={avisosBuenaConductaFilter}
                      type="BuenaConducta"
                      nombre="Papeles de buena conducta"
                      color="pink"
                      title="Papeles de buena conducta proximos a vencer"
                    />
                  }
                ></Route>
                <Route
                  path="/proyectos"
                  element={<Proyectos proyectos={props?.proyectos} />}
                ></Route>
                <Route
                  path="/notificaciones/analisis"
                  element={
                    <CardNotificacion
                      notificaciones={avisosAnalisisFilter}
                      type="Analisis"
                      nombre="Analisis"
                      color="blue"
                      title="Analisis proximos a vencer"
                    />
                  }
                ></Route>
                <Route
                  path="/reportes"
                  element={
                    <Reportes
                      departamentos={props?.departamentos}
                      empleados={props.empleados?.empleados}
                    />
                  }
                ></Route>
                <Route path="/invoice" element={<Inicio />}></Route>
                <Route
                  path="/equipos"
                  element={<Equipos equipos={props.equipos} />}
                ></Route>
                <Route
                  path="/crearempleado"
                  element={
                    <Form
                      departamentos={props?.departamentos}
                      puestos={props?.puestos}
                    />
                  }
                ></Route>
                <Route
                  path="/verempleados"
                  element={
                    <VerEmpleados empleados={props.empleados?.empleados} />
                  }
                ></Route>
                <Route path="/login" element={<Login />}></Route>
                <Route
                  path="/verdepartamentos"
                  element={
                    <VerDepartamentos departamentos={props?.departamentos} />
                  }
                ></Route>
                <Route
                  path="/vacaciones"
                  element={
                    <Vacaciones empleados={props.empleados?.empleados} />
                  }
                ></Route>
                <Route
                  path="/perfil"
                  element={<Perfil empleados={props.empleados?.empleados} />}
                ></Route>
                <Route
                  path="/permisos"
                  element={<Permisos empleados={props.empleados?.empleados} />}
                ></Route>
                <Route path="/avisos" element={<Avisos />}></Route>
                <Route
                  path="/vacantes"
                  element={<Vacantes vacantes={props.vacantes} />}
                ></Route>
                <Route
                  path="/vervacantes"
                  element={<VerVacantesPage vacantes={props.vacantes} />}
                ></Route>
                <Route
                  path="/candidatos"
                  element={
                    <Candidatos
                      entrevistados={props.entrevistados?.entrevistados}
                    />
                  }
                ></Route>
                <Route
                  path="/creardespidos"
                  element={<CrearDespidos />}
                ></Route>

                <Route
                  path="/despidos"
                  element={<Despidos empleados={props.empleados?.empleados} />}
                ></Route>
                <Route path="/despidosVer" element={<DespidosVer />}></Route>
                <Route
                  path="/epp"
                  element={<Epp empleados={props.empleados?.empleados} />}
                ></Route>
                <Route path="/stats" element={<Stats />}></Route>
                <Route
                  path="/puestos"
                  element={<Puesto puestos={props?.puestos} />}
                ></Route>

                <Route path="/buscarempleados" element={<Buscador />}></Route>
                <Route
                  path="/reportesdiarios"
                  element={
                    <ReportesDiarios
                      empleados={props.empleados?.empleados}
                      proyectos={props.proyectos}
                    />
                  }
                ></Route>
                <Route
                  path="/dimitidos"
                  element={<Dimitidos empleados={props.empleados?.empleados} />}
                ></Route>
                <Route
                  path="/compensaciones"
                  element={
                    <Compensaciones empleados={props.empleados?.empleados} />
                  }
                ></Route>
                <Route
                  path="/amonestaciones"
                  element={
                    <Amonestaciones empleados={props.empleados?.empleados} />
                  }
                ></Route>
                <Route
                  path="/licencias"
                  element={<Licencias empleados={props.empleados?.empleados} />}
                ></Route>
                <Route path="/print" element={<Print />}></Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.isLoggedIn,
    usuario: state.user,
    empleados: state.empleados,
    departamentos: state.departamentos.Departamentos,
    estado: state.cambiarState,
    puestos: state.puestos.puestos,
    entrevistados: state.entrevistados.entrevistados,
    vacantes: state.Vacantes.vacantes,
    equipos: state.Equipos.equipos,
    proyectos: state.Proyectos.proyectos,
  };
};

export default connect(mapStateToProps, {
  loggedUserIn,
  loggedUserOut,
  setUser,
  cargarEmpleados,
  cargarDepartamentos,
  GET_PUESTOS_ACTION,
  GET_ENTREVISTADOS,
  GET_VACANTES_ACTION,
  CARGAR_EQUIPOS_ACTION,
  CARGAR_PROYECTOS_FUNCTION,
})(App);
