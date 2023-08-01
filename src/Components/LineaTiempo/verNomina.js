import React from "react";
import { connect } from "react-redux";
import moment from "moment"; // without this line it didn't work
moment.locale("es");

const PermisoVer = (props) => {
  console.log(props.nominaSelecionada);
  return (
    <div className="verVacacionesModal">
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Mes:</div>
        <div className="verVacacionesValue">
          {" "}
          {props?.nominaSelecionada?.mes || "Por definir"}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Año:</div>
        <div className="verVacacionesValue">
          {props?.nominaSelecionada?.year || "Por definir"}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Sueldo Bruto:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.sueldoBruto || 0
          )}$RD
        </div>
      </div>

      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Sueldo Neto:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.sueldoNeto || 0
          )}$RD
        </div>
      </div>

      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Sueldo Fijo:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.sueldoFijo || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">AFP:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.afp || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">SFS:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.sfs || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">ISR:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.isr || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Descuentos Independientes:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.descuentos || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Total Desuento:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.totalDescuento || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Bonus:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.bonus || 0
          )}$RD
        </div>
      </div>

      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Regalia:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.regalia || 0
          )}$RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Vacaciones:</div>
        <div className="verVacacionesValue">
          {new Intl.NumberFormat("es-DO").format(
            props.nominaSelecionada?.salarioPorVacaciones || 0
          )}{" "}
          $RD
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Fecha de Creación:</div>
        <div className="verVacacionesValue">
          {moment(props.nominaSelecionada?.createdAt).format(
            "MMMM Do YYYY, h:mm:ss a"
          )}
        </div>
      </div>
    </div>
  );
};

const StateMapToProps = (state) => {
  return {
    nominaSelecionada: state.nominaSelecionada.nominaSelecionada,
    estado: state.cambiarState,
  };
};

export default connect(StateMapToProps, {})(PermisoVer);
