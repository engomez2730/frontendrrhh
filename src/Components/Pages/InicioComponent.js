import React from "react";
import "./InicioComponent.css";
import { Button } from "antd";
import { Link } from "react-router-dom";

const InicioComponent = () => {
  return (
    <div className="inicioComponent">
      <img src="logoVargSang.JPG" />
      <h2 className="headingLogo">"Gestor de Recursos Humanos"</h2>
      <Button
        size="large"
        style={{
          width: "20%",
          height: "70px",
          background: "#F8921F",
          color: "#fff",
          fontSize: "25px",
          fontWeight: "700",
          textAlign: "center",
          borderRadius: "10px",
        }}
      >
        <Link to="/login">Iniciar</Link>
      </Button>
    </div>
  );
};

export default InicioComponent;
