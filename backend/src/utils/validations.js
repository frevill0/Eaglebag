export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regex.test(password);
};

export const validateUsername = (username) => {
  const regex = /^[a-zA-Z0-9_]{3,50}$/;
  return regex.test(username);
};

export const validateCodigoColaborador = (codigo) => {
  return /^\d{1,19}$/.test(codigo.toString());
};

export const validateEstado = (estado) => {
  return estado === 0 || estado === 1;
};

export const validateCedula = (cedula) => {
  // Verifica que la cédula tenga 10 dígitos y solo contenga números
  const regex = /^\d{10}$/;
  return regex.test(cedula);
};

export const validatePhoneNumber = (telefono) => {
  // Acepta números de teléfono ecuatorianos (09 seguido de 8 dígitos)
  const regex = /^09\d{8}$/;
  return regex.test(telefono);
};

export const validateCodigoSocio = (codigo) => {
  // Similar a validateCodigoColaborador, acepta números de hasta 4 dígitos
  return /^\d{1,4}$/.test(codigo.toString());
}; 