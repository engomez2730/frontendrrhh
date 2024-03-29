// TemplatePrint.js
import React from "react";
import moment from "moment";
import "./Print.css";

const TemplatePrint = React.forwardRef((props, ref) => {
  const renderNombre = (nombre) => {
    if (nombre) {
      return <span className="spanFecha">EPPS de {nombre}</span>;
    } else {
      return null;
    }
  };

  return (
    <div
      style={{ width: "100%", height: window.innerHeight }}
      className="print"
      ref={ref}
    >
      <div className="headerPrint">
        <h1 className="headingPrint">{props.title}</h1>
        <h3 className="fechaPrint">
          <span className="spanFecha">Fecha:</span>
          <span className="spanFecha">
            {props?.fechaReporte
              ? moment(props?.fechaReporte).format("MMMM Do YYYY")
              : null || moment(new Date()).format("MMMM Do YYYY")}
          </span>
        </h3>
      </div>
      {renderNombre(props?.nombre)}
      {props.Table}
      {props.description}
      {props.resumen}
    </div>
  );
});

export default TemplatePrint;
