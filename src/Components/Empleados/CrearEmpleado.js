import "./CrearEmpleado.css";
import React from "react";
import Form from "./Form";
import requireAuth from "../requireAuth";

const CrearEmpleado = () => {
  return (
    <div className="">
      <Form />
    </div>
  );
};

export default requireAuth(CrearEmpleado);
