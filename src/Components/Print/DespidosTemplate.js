// TemplatePrint.js
import React from "react";
import moment from "moment";
import "./DespidosTemplate.css";
import handlError from "../../Data/errorHandle";

function formatId(id) {
  let formattedId;
  try {
    if (typeof id === "number") {
      id = id?.toString();
    }

    if (typeof id !== "string" || id.length !== 11) {
      throw new Error(
        "Invalid ID format. It should be a 11-digit number or string."
      );
    }

    formattedId = `${id?.slice(0, 3)}-${id?.slice(3, 11 - 1)}-${id?.slice(
      11 - 1
    )}`;
  } catch (err) {
    handlError(err);
  }
  return formattedId;
}

const TemplatePrint = React.forwardRef((props, ref) => {
  return (
    <div
      style={{ width: "100%", height: window.innerHeight }}
      className="print"
      ref={ref}
    >
      <div className="logo">
        <img alt="Logo" src="./logoVargSang.JPG" className="image" />
      </div>

      <div className="fechaDehoy">
        <div className="fechaDehoy">{moment().format("DD/MM/YYYY")}</div>
        <div className="fechaDehoy">Monseñor Nouel, Rep. Dom</div>
      </div>

      <div className="dedicatoria">
        <div className="senores">Señores:</div>
        <div className="ministerio">Ministerio de Trabajo</div>
        <div className="atencion">Atencion: Oficina Administración Local</div>
        <div className="ciudad">Ciudad</div>
      </div>

      <div className="distinguidos">Distinguidos Señores</div>

      <div className="paragraph">
        <p>
          En virtud del articulo 75-77 del código de Trabajo de la República
          Dominicana , tenemos a bien informarle, que , a partir de la fecha de
          esta correspondencia , la empresa ha decidido dar por terminado el
          contrato de trabajo que tenía vigente con el SR
          <span className="empleado">{props.Usuario?.nombre}</span>
          <span className="empleado">{props.Usuario?.apellido}</span>
          cédula de identidad y electoral No.{" "}
          <span className="empleado">{formatId(props.Usuario?.cedula)}</span>.
          La empresa le informa que, de acuerdo al plazo establecido por la ley
          , la empresa le pagará sus prestaciones laborales correspondiente y
          sus derechos adquiridos .
        </p>
      </div>

      <div className="cordial">Cordialmente:</div>
      <div className="final">
        <div className="licenciada">
          <div className="licda">Licda: PERLA TINEO DE SANG</div>
          <div className="coord">Coord. de Recursos Humanos</div>
        </div>
        <div className="info">
          <div className="direccion">
            Autopista Duarte, Km. 83 ½, Bonao, Rep. Dom.
          </div>
          <div className="telefoo">
            RNC: 13091997 Tel: 829-441-3801 / 829-657-0255
          </div>
          <div className="correos">
            Email: eherrera@vargsangcons.com pdesang@vargsangcons.com
          </div>
        </div>
      </div>
    </div>
  );
});

export default TemplatePrint;
