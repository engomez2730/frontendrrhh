// TemplatePrint.js
import React from "react";
import moment from "moment";
import { Table } from "antd";
import "./Print.css";

const TemplatePrint = React.forwardRef((props, ref) => {
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
            {moment(new Date()).format("MMMM Do YYYY, h:mm:ss a")}
          </span>
        </h3>
      </div>
      {props.Table}
      {props.description}
    </div>
  );
});

export default TemplatePrint;
