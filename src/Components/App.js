import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import "./App.css";
import "antd/dist/antd.min.css";
import Header from "./Pages/header";
import Sider from "./Empleados/Sidebar";
import Form from "./Empleados/Form";
import { Routes, Route } from "react-router-dom";
import { /* Breadcrumb, */ Layout } from "antd";
import {
  setUser,
  loggedUserIn,
  loggedUserOut,
  cargarEmpleados,
  cargarDepartamentos,
  GET_PUESTOS_ACTION,
  GET_ENTREVISTADOS,
  GET_VACANTES_ACTION,
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

const { Content } = Layout;

const App = (props) => {
  const [userActive, userActiveSet] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  console.log(props?.empleados);

  useEffect(() => {
    props.cargarEmpleados();
    props.cargarDepartamentos();
    props.GET_PUESTOS_ACTION();
    props.GET_ENTREVISTADOS();
    props.GET_VACANTES_ACTION();
  }, [props.estado]);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    if (userLocal && userLocal.rol === "admin") {
      props.loggedUserIn();
      props.setUser(userLocal);
    }
  }, []);

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
})(App);
