import moment from "moment";

const VerVacaciones = (props) => {
  return (
    <div className="verVacacionesModal">
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Inicio de Vacaciones:</div>
        <div className="verVacacionesValue">
          {" "}
          {moment(props?.vacacion?.tiempoDeVacaciones[0]).format(
            "MMMM Do YYYY"
          )}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Final de Vacaciones:</div>
        <div className="verVacacionesValue">
          {" "}
          {moment(props?.vacacion?.tiempoDeVacaciones[1]).format(
            "MMMM Do YYYY"
          )}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Dias de Vacaciones:</div>
        <div className="verVacacionesValue">
          {" "}
          {props?.vacacion?.diasDeVacaciones}
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Salario de Vacaciones:</div>
        <div className="verVacacionesValue">
          {" "}
          {new Intl.NumberFormat("es-DO", {
            maximumSignificantDigits: 3,
          }).format(props?.vacacion?.salarioPorVacaciones)}{" "}
          RD$
        </div>
      </div>
      <div className="verVacacionesItem">
        <div className="verVacacionesLabel">Siguiente fecha de Vacaciones:</div>
        <div className="verVacacionesValue">
          {" "}
          {moment(props?.vacacion?.siguientesVacacionesFecha).format(
            "MMMM Do YYYY"
          )}
        </div>
      </div>
    </div>
  );
};

export default VerVacaciones;
