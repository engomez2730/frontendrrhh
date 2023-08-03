import moment from "moment";
import React, { useEffect } from "react";
import { connect } from "react-redux";

const EmpresaInfoPer = ({ usuarioSelecionado, usuarioEditado }) => {
  useEffect(() => {
    console.log(usuarioSelecionado?.licenciasDeConducir);
  }, [usuarioEditado]);
  return (
    <div className="infoParent">
      <div className="header-info">
        <div className="infoSpace">
          <div className="nombres">
            <div className="subNombres">Tipo de Contrato:</div>
            <div className="realNombres">{usuarioSelecionado?.contrato}</div>
          </div>
          <div className="nombres">
            <div className="subNombres">Rol del Empleado:</div>
            <div className="realNombres">{usuarioSelecionado?.rol}</div>
          </div>
          <div className="nombres">
            <div className="subNombres">Salario:</div>
            <div className="realNombres">
              {new Intl.NumberFormat("es-DO").format(
                usuarioSelecionado?.sueldoFijo
              )}{" "}
              RD$
            </div>
          </div>
          <div className="nombres">
            <div className="subNombres">Departamento:</div>
            <div className="realNombres">
              {usuarioSelecionado?.departamento}
            </div>
          </div>
          <div className="nombres">
            <div className="subNombres">Tiempo en la Empresa:</div>
            <div className="realNombres">
              {usuarioSelecionado?.tiempoEnLaEmpresa}
            </div>
          </div>
          <div className="nombres">
            <div className="subNombres">¿Posee Licencia de Conducir?</div>
            <div className="realNombres">
              {usuarioSelecionado?.licenciasDeConducir ? "Si" : "No"}
            </div>
          </div>
          <div className="nombres">
            <div className="subNombres">Categoria de la Licencia</div>
            <div className="realNombres">
              {usuarioSelecionado?.licenciasDeConducir
                ? usuarioSelecionado?.tipoLicencia
                : "No tiene"}
            </div>
          </div>
          <div className="nombres">
            <div className="subNombres">¿Posee Licencia de Conducir?</div>
            <div className="realNombres">
              {usuarioSelecionado?.licenciasDeConducir
                ? moment(usuarioSelecionado?.licenciaDeConducirFechaExp).format(
                    "MMMM Do YYYY"
                  )
                : "no tiene"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const stateMapToProps = (state) => {
  return { usuarioEditado: state.usuarioEditarSeleciondo };
};

export default connect(stateMapToProps, {})(EmpresaInfoPer);
