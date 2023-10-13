import moment from "moment";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Button, Modal, Tag } from "antd";
import { Historial } from "./Historial";

const EmpresaInfoPer = ({ usuarioSelecionado, usuarioEditado }) => {
  useEffect(() => {}, [usuarioEditado]);

  const [isModalOpenEdit, setIsModalEditOpen] = useState(false);

  const showModalEdit = () => {
    setIsModalEditOpen(true);
  };

  const handleOkEdit = () => {
    setIsModalEditOpen(false);
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  const ListOfEquipos = (listaDeEquipos) => {
    return listaDeEquipos?.map((equipo) => <Tag color="#108ee9">{equipo}</Tag>);
  };

  return (
    <>
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
              <div className="subNombres">Tipo de Nomina</div>
              <div className="realNombres">
                {usuarioSelecionado?.tipoDeNomina}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Costo por Hora:</div>
              <div className="realNombres">
                {usuarioSelecionado?.costoPorHora
                  ? usuarioSelecionado?.costoPorHora
                  : "No tiene, Nomina FIja"}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Salario:</div>
              <div className="realNombres">
                {new Intl.NumberFormat("es-DO").format(
                  usuarioSelecionado?.salarioBruto
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
              <div className="subNombres">Proyecto Actual:</div>
              <div className="realNombres">
                {usuarioSelecionado?.proyectoActual}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Estado Laboral:</div>
              <div className="realNombres">
                {usuarioSelecionado?.StatusLaboral}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Comentario:</div>
              <div className="realNombres">
                {usuarioSelecionado?.comentarioStatus
                  ? usuarioSelecionado?.comentarioStatus
                  : "No tiene"}
              </div>
            </div>

            <div className="nombres">
              <div className="subNombres">Entrada a la empresa:</div>
              <div className="realNombres">
                {moment(usuarioSelecionado?.inicioLaboral).format(
                  "MMMM Do YYYY"
                )}
              </div>
            </div>
            <hr />

            <div className="nombres">
              <div className="subNombres">Equipos que maneja:</div>
              <div className="realNombres">
                {ListOfEquipos(usuarioSelecionado?.Equipos)}
              </div>
            </div>

            <div className="nombres">
              <div className="subNombres">
                Expiración de papel de buena conducta:
              </div>
              <div className="realNombres">
                {moment(
                  usuarioSelecionado?.buenaConductaFechaExpiracion
                ).format("MMMM Do YYYY")}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Expiración inducción:</div>
              <div className="realNombres">
                {moment(usuarioSelecionado?.induccionFechaDeExpiracion).format(
                  "MMMM Do YYYY"
                )}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Expiración de analisis:</div>
              <div className="realNombres">
                {moment(usuarioSelecionado?.analisisFechaDeExpiracion).format(
                  "MMMM Do YYYY"
                )}
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
              <div className="subNombres">
                Expiración de licencia de conducir
              </div>
              <div className="realNombres">
                {usuarioSelecionado?.licenciasDeConducir
                  ? moment(
                      usuarioSelecionado?.licenciaDeConducirFechaExp
                    ).format("MMMM Do YYYY")
                  : "no tiene"}
              </div>
            </div>
            <div className="nombres">
              <div className="subNombres">Ver Historial</div>
              <div className="realNombres">
                <Button type="primary" onClick={() => showModalEdit()}>
                  Ver Historial
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Historial del empleado"
        open={isModalOpenEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        width={1000}
        okText="Esta bien"
        cancelText="Cerrar"
      >
        <Historial historial={usuarioSelecionado?.historial} />
      </Modal>
    </>
  );
};

const stateMapToProps = (state) => {
  return { usuarioEditado: state.usuarioEditarSeleciondo };
};

export default connect(stateMapToProps, {})(EmpresaInfoPer);
