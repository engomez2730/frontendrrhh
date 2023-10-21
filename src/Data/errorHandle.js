import { message } from "antd";

const handleError = (err) => {
  console.log(err);
  if (err.response.data === undefined) {
    return message.error(`Ocurrio un problema con el servidor`);
  }

  if (err.response.data.error.code === 11000) {
    const key = Object.keys(err.response.data.error.keyPattern);
    const valor = Object.values(err.response.data.error.keyValue);
    return message.error(`El campo ${key} con valor ${valor} ya esta en uso `);
  } else if (err.response.data.error.name === "ValidationError") {
    return message.error(
      `Error de Validacion, confirma que los campos sean del mismo tipo que se le pide`,
      4
    );
  } else if (err.code === "ERR_NETWORK") {
    return message.error(`Error con la red`);
  }
  return message.error(err.response.data.message, 3);
};

export default handleError;
