import React from "react";
import moment from "moment";

const NotCumpleaños = ({ showDays, notificacion, type }) => {
  if (type === "cumpleanos") {
    return (
      <span>
        El cumpleaños de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        cerca, es en {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.cumpleaños).format("MMMM DD")}) 🎈🎉🎁
      </span>
    );
  }

  if (type === "Analisis") {
    return (
      <span>
        Los Analisis de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> estan
        cerca de vencer, vence en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }

  if (type === "BuenaConducta") {
    return (
      <span>
        El papel de buena conducta de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        cerca de vencer, vence en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }

  if (type === "licenciaConducir") {
    return (
      <span>
        La Licencia de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        cerca de vencer, vence en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }
  if (type === "induccion") {
    return (
      <span>
        El papel de inducción de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        cerca de vencer, vence en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }
  if (type === "LicenciasNormales") {
    return (
      <span>
        La Licencia de{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        cerca de vencer, vence en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }
  if (type === "Vacaciones") {
    return (
      <span>
        Las vacaciones{" "}
        <span style={{ fontWeight: 700 }}>{notificacion?.nombre}</span> esta
        proximas a llegar, sus proximas vacaciones serán en{" "}
        {showDays(notificacion?.diasAntesDeExpiracion)}, (
        {moment(notificacion?.diaDeVencimiento).format("MMMM DD")})
      </span>
    );
  }

  return <div>dd</div>;
};

export default NotCumpleaños;
