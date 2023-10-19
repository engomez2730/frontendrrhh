import moment from "moment";

export function calculateDaysUntilNextBirthday(empleado, birthdate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)
  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the birthdate
  const today = moment();
  const birthday = moment(birthdate);

  // Calculate the next birthday for this year
  const thisYearBirthday = moment(today).set({
    month: birthday.month(),
    date: birthday.date(),
  });

  if (today.isAfter(thisYearBirthday)) {
    return false;
  } else {
    // Birthday for this year is still ahead
    const daysUntilBirthday = thisYearBirthday.diff(today, "days");
    if (daysUntilBirthday <= 5) {
      return {
        nombre: `${empleado.nombre}  ${empleado.apellido}`,
        diasAntesDeExpiracion: daysUntilBirthday,
        cumpleaños: empleado.fechaDeNacimiento,
        id: empleado._id,
        rol: empleado.rol,
        estado: empleado.estado,
      };
    } else {
      return false;
    }
  }
}

export function calculateDaysUntilLicenseExpiry(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)

  if (!empleado.licenciasDeConducir) return false;
  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: empleado.licenciaDeConducirFechaExp,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}

export function calculateDaysUntilPaperConducta(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)
  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: expiryDate,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}

export function calculateDaysUntilInduccion(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)
  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: expiryDate,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}

export function calculateDaysUntilAnalisis(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)
  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 30 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: expiryDate,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}

export function calculateLicencias(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)

  if (expiryDate === undefined) return false;

  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 5 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: expiryDate,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}

export function calculateVacacionesDays(empleado, expiryDate) {
  // Set the timezone to America/Santo_Domingo (Dominican Republic)

  if (expiryDate === undefined) return false;

  const dominicanRepublicTimezone = "America/Santo_Domingo";
  moment.tz?.setDefault(dominicanRepublicTimezone);

  // Create moment objects for today and the license expiry date
  const today = moment();
  const expiration = moment(expiryDate);

  // Calculate the number of days until the license expires
  const daysUntilExpiry = expiration.diff(today, "days");

  if (daysUntilExpiry <= 5 && daysUntilExpiry >= 0) {
    // If the license expires within the next 30 days (inclusive of today)
    return {
      nombre: `${empleado.nombre}  ${empleado.apellido}`,
      diasAntesDeExpiracion: daysUntilExpiry,
      diaDeVencimiento: expiryDate,
      id: empleado._id,
      rol: empleado.rol,
      estado: empleado.estado,
    };
  } else {
    // If the license does not expire within the specified timeframe
    return false;
  }
}
