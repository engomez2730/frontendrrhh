import { useEffect, useState } from "react";
import { Badge, Descriptions, Space } from "antd";
import { GET_DESPIDOS_ACTION } from "../../actions/index";
import { connect } from "react-redux";
import moment from "moment";
import PrintComponent from "../Print/Print";
import DescriptionTemplate from "../Print/DescriptionTemplate";

const App = (props) => {
  useEffect(() => {}, [props?.buscadorData]);

  console.log(props?.buscadorData);

  function formatPhoneNumber(number) {
    if (!number) return 0;
    if (typeof number !== "number" || number.toString().length !== 10) {
      throw new Error("Input should be a 10-digit number");
    }

    const areaCode = number.toString().substring(0, 3);
    const middleDigits = number.toString().substring(3, 6);
    const lastDigits = number.toString().substring(6);

    return `${areaCode}-${middleDigits}-${lastDigits}`;
  }

  console.log(props?.buscadorData);

  return (
    <>
      <Descriptions
        title="Informacion del Empleado"
        layout="horizontal"
        bordered={true}
      >
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Estado">
          <Badge
            status={props?.buscadorData?.estado ? "success" : "error"}
            text={props?.buscadorData?.estado ? "Activo" : "Inactivo"}
          />
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Nombre Completo"
        >
          {props?.buscadorData?.nombre} {props?.buscadorData?.apellido}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Telefono"
        >
          {props?.buscadorData?.cedula}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Puesto">
          {props?.buscadorData?.puesto}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Entrada a la empresa"
        >
          {props?.buscadorData?.createdAt
            ? moment(props?.buscadorData?.createdAt).format("MMMM Do YYYY")
            : null}{" "}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Salario">
          {new Intl.NumberFormat("es-RD").format(
            props.buscadorData?.salarioBruto
          )}
          $
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Telefono"
        >
          {formatPhoneNumber(props?.buscadorData?.celular)}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Correo">
          {props?.buscadorData?.correo}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Provincia"
        >
          {props?.buscadorData?.provincia}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Pais">
          {props?.buscadorData?.pais}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Sexo">
          {props?.buscadorData?.genero}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Fecha de Nacimiento"
        >
          {props?.buscadorData?.fechaDeNacimiento
            ? moment(props?.buscadorData?.fechaDeNacimiento).format(
                "MMMM Do YYYY"
              )
            : null}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Departamento"
        >
          {props?.buscadorData?.departamento}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Tipo de Nomina"
        >
          {props?.buscadorData?.tipoDeNomina}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Contacto de Emergencia"
        >
          {formatPhoneNumber(props.buscadorData?.contactoDeEmergencia)}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="¿Tiene Licencia?"
        >
          {props?.buscadorData?.licenciasDeConducir ? "Si" : "No"}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Tipo de Licencia"
        >
          {props?.buscadorData?.licenciasDeConducir
            ? props?.buscadorData?.tipoLicencia
            : "No tiene" || "No establecido"}
        </Descriptions.Item>

        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Dirección"
        >
          {props?.buscadorData?.direccion}
        </Descriptions.Item>
      </Descriptions>

      {!props.buscadorData.estado ? (
        <Descriptions
          title="Informacion del Empleado Dimitido"
          layout="horizontal"
          bordered={true}
          style={{ marginTop: "50px" }}
        >
          <Descriptions.Item
            contentStyle={{ fontWeight: "600" }}
            label="Salida de la empresa"
          >
            {moment(props?.buscadorData.Despidos[0]?.fechaDespido).format(
              "MMMM Do YYYY"
            )}
          </Descriptions.Item>
          <Descriptions.Item
            contentStyle={{ fontWeight: "600" }}
            label="Prestaciones Laborables Recibidas"
          >
            {props?.buscadorData?.Despidos[0]?.prestacionesLaborables}$
          </Descriptions.Item>

          <Descriptions.Item
            contentStyle={{ fontWeight: "600" }}
            label="Tipo de Despido"
          >
            {props?.buscadorData?.Despidos[0]?.tipoDeDespido}
          </Descriptions.Item>
        </Descriptions>
      ) : null}
      <PrintComponent
        componentToPrint={
          <DescriptionTemplate
            title={`Información de ${props?.buscadorData?.nombre}`}
          />
        }
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    buscadorData: state.BuscadorEmpleados.buscadorEmpleados,
    despidos: state.Despidos.despidos,
  };
};
export default connect(mapStateToProps, {
  GET_DESPIDOS_ACTION,
})(App);
