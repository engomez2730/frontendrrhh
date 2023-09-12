import React from "react";
import { connect } from "react-redux";
import Stats from "../Stats/Stats";
import InicioComponent from "./InicioComponent";

const Inicio = (props) => {
  const renderInicio = () => {
    if (
      props.state.isLoggedIn.isLoggedIn &&
      props.state.user.user?.rol === "admin"
    ) {
      return <Stats />;
    } else {
      return <InicioComponent />;
    }
  };

  return <div>{renderInicio()}</div>;
};

const stateMapToProps = (state) => {
  return { state: state };
};

export default connect(stateMapToProps, {})(Inicio);
