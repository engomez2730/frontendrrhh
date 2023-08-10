import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.min.css";
import Header from "./Pages/header";
import Sider from "./Empleados/Sidebar";
import CrearEmpleado from "./Empleados/CrearEmpleado";
import { Routes, Route } from "react-router-dom";
import { /* Breadcrumb, */ Layout } from "antd";
import {
  setUser,
  loggedUserIn,
  loggedUserOut,
  cargarEmpleados,
  cargarDepartamentos,
} from "../actions";
import Login from "../Components/Pages/login";
import VerEmpleados from "./Empleados/VerEmpleados";
import Inicio from "./Pages/Inicio";
import VerDepartamentos from "../Components/Departamentos/VerDepartamentos";
import Vacaciones from "./Vacaciones/Vacaciones.js";
import Nomina from "./Nomina/Nomina";
import Permisos from "./Permisos/Permisos";
import Avisos from "./Avisos/Avisos";
import Vacantes from "./Vacantes/vacantes";
import VerVacantesPage from "./Vacantes/verVacantesPage";
import Candidatos from "./Candidato/Candidato";
import CrearDespidos from "./Despidos/CrearDespido";
import NominaCompleta from "./NominaCompleta/NominaCompleta";
import LinaDeTiempo from "./LineaTiempo/LineaDeTiempo";
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
const { Content } = Layout;

const App = (props) => {
  const [userActive, userActiveSet] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal && userLocal.rol === "admin") {
      props.loggedUserIn();
      props.setUser(userLocal);
      props.cargarEmpleados();
      props.cargarDepartamentos();
    }
  }, [props.estado]);

  const USER = JSON.parse(localStorage.getItem("user"));

  function getCookies() {
    var cookies = document.cookie.split(";");
    var ret = "";
    for (var i = 1; i <= cookies.length; i++) {
      ret += i + " - " + cookies[i - 1] + "<br>";
    }
    return ret.split("=")[1];
  }

  const token = getCookies();
  /*   props.setUser(USER)
   */

  const renderSider = () => {
    if ((props?.isLoggedIn?.isLoggedIn || token) && USER?.rol === "admin") {
      return <Sider />;
    } else if (
      (props?.isLoggedIn?.isLoggedIn || token) &&
      USER?.rol === "empleado"
    ) {
      return <EmpleadoPage />;
    }
  };

  return (
    <div>
      <Layout>
        <Header />
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
                  path="/crearempleado"
                  element={<CrearEmpleado />}
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
                    <VerDepartamentos departamentos={props.departamentos} />
                  }
                ></Route>
                <Route path="/vacaciones" element={<Vacaciones />}></Route>
                <Route
                  path="/perfil"
                  element={<Perfil empleados={props.empleados?.empleados} />}
                ></Route>
                <Route path="/nomina" element={<Nomina />}></Route>
                <Route path="/permisos" element={<Permisos />}></Route>
                <Route path="/avisos" element={<Avisos />}></Route>
                <Route path="/vacantes" element={<Vacantes />}></Route>
                <Route
                  path="/vervacantes"
                  element={<VerVacantesPage />}
                ></Route>
                <Route path="/candidatos" element={<Candidatos />}></Route>
                <Route
                  path="/creardespidos"
                  element={<CrearDespidos />}
                ></Route>
                <Route
                  path="/manejarnomina"
                  element={<NominaCompleta />}
                ></Route>
                <Route path="/lineadetiempo" element={<LinaDeTiempo />}></Route>
                <Route path="/despidos" element={<Despidos />}></Route>
                <Route path="/despidosVer" element={<DespidosVer />}></Route>
                <Route path="/epp" element={<Epp />}></Route>
                <Route path="/stats" element={<Stats />}></Route>
                <Route path="/puestos" element={<Puesto />}></Route>

                <Route path="/buscarempleados" element={<Buscador />}></Route>
                <Route path="/dimitidos" element={<Dimitidos />}></Route>
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
                <Route path="/licencias" element={<Licencias />}></Route>
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
  };
};

export default connect(mapStateToProps, {
  loggedUserIn,
  loggedUserOut,
  setUser,
  cargarEmpleados,
  cargarDepartamentos,
})(App);
