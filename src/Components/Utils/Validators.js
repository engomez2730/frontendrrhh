import moment from "moment";

export const validateMinLength = (value, minLength) => {
  if (value && value.length < minLength) {
    return Promise.reject(`Debe tener al menos ${minLength} digitos.`);
  }
  return Promise.resolve();
};

export const validateAge = (rule, date, callback) => {
  if (date && moment().diff(date, "years") < 18) {
    callback("Debes ser mayor de 18 años.");
  } else {
    callback();
  }
};

export const validateAllNumbers = (rule, value, callback) => {
  const regex = /^(-?\d+)$/;

  if (!regex.test(value)) {
    callback("Deben ser solo numeros");
  } else {
    callback();
  }
};
