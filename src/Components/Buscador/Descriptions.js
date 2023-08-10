import { useEffect } from "react";
import { Badge, Descriptions } from "antd";
import { GET_DESPIDOS_ACTION } from "../../actions/index";
import { connect } from "react-redux";
import moment from "moment";

const App = (props) => {
  useEffect(() => {
    props.GET_DESPIDOS_ACTION();
  }, []);

  const despido = props?.despidos?.find((e) => {
    return e?.Usuario?._id === props?.buscadorData?._id;
  });

  return (
    <>
      <Descriptions
        title="Informacion del Empleado"
        layout="horizontal"
        bordered={true}
      >
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
          {props?.buscadorData?.celular}
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
          {props?.buscadorData?.sexo}
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
          label="Entrada a la empresa"
        >
          {props?.buscadorData?.createdAt
            ? moment(props?.buscadorData?.createdAt).format("MMMM Do YYYY")
            : null}{" "}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Estado">
          <Badge
            status={props?.buscadorData?.estado ? "success" : "error"}
            text={props?.buscadorData?.estado ? "Activo" : "Inactivo"}
          />
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Salario">
          {new Intl.NumberFormat("es-RD").format(
            props.buscadorData?.sueldoFijo
          )}
          $
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Tipo de Nomina"
        >
          {props?.buscadorData?.tipoDeNomina}
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Puesto">
          {props?.buscadorData?.puesto}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Ultimas Vacaciones"
        >
          {props?.buscadorData?.Vacaciones[
            props?.buscadorData?.Vacaciones?.length - 1
          ]?.tiempoDeVacaciones[0]
            ? moment(
                props?.buscadorData?.Vacaciones[
                  props?.buscadorData?.Vacaciones?.length - 1
                ]?.tiempoDeVacaciones[0]
              ).format("MMMM Do YYYY")
            : "No Ha tomado aun"}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Dirreccion"
        >
          {props?.buscadorData?.direccion}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Contacto de Emergencia"
        >
          {props?.buscadorData?.contactoDeEmergencia}
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
            ? props?.buscadorData?.licenciasDeConducir
            : "No tiene"}
        </Descriptions.Item>
      </Descriptions>

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
          {" "}
          {despido?.fechaDespido
            ? moment(despido?.fechaDespido).format("MMMM Do YYYY")
            : ""}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Prestaciones Laborables Recibidas"
        >
          {new Intl.NumberFormat("es-RD").format(
            despido?.prestacionesLaborables
          )}
          $
        </Descriptions.Item>
        <Descriptions.Item contentStyle={{ fontWeight: "600" }} label="Razon">
          {despido?.razon}
        </Descriptions.Item>
        <Descriptions.Item
          contentStyle={{ fontWeight: "600" }}
          label="Tipo de Despido"
        >
          {despido?.tipoDeDespido}
        </Descriptions.Item>
      </Descriptions>
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
