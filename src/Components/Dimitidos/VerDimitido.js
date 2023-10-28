import React from "react";
import moment from "moment";
import { Divider, Tag } from "antd";

const NominaVer = ({ Dimitido }) => {
  return (
    <div className="verVacacionesModal">
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Nombre Completo:</div>
        <div className="verVacacionesValue">
          {" "}
          {`${Dimitido?.nombre} ${Dimitido?.apellido}`}{" "}
        </div>
      </div>

      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Cedula:</div>
        <div className="verVacacionesValue"> {Dimitido?.cedula} </div>
      </div>

      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Puesto anterior:</div>
        <div className="verVacacionesValue"> {Dimitido?.puesto} </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Sueldo anterior:</div>
        <div className="verVacacionesValue"> {Dimitido?.salarioBruto} </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Llegada a la empresa:</div>
        <div className="verVacacionesValue">
          {" "}
          {moment(Dimitido?.inicioLaboral).format("MMMM Do YYYY")}{" "}
        </div>
      </div>
      <Divider
        children={
          <Tag
            color="error"
            style={{
              width: "200px",
              height: "35px",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              fontSize: "18px",
              textAlign: "center",
            }}
          >
            Salida de la Empresa
          </Tag>
        }
      />
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Tipo de salida: </div>
        <div className="verVacacionesValue">
          {" "}
          {Dimitido?.Despidos[0]?.tipoDeDespido}{" "}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Descripción: </div>
        <div className="verVacacionesValue">
          {" "}
          {Dimitido?.Despidos[0]?.descripcion}{" "}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Fecha de Salida: </div>
        <div className="verVacacionesValue">
          {" "}
          {moment(Dimitido?.Despidos[0]?.fechaDespido).format(
            "MMMM Do YYYY"
          )}{" "}
        </div>
      </div>
    </div>
  );
};

export default NominaVer;
