export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePassword = (password) => {
  // Validación más clara y permisiva para caracteres especiales
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[@$!%*?&#._\-]/.test(password);
  
  return (
    password.length >= minLength &&
    hasUpperCase &&
    hasLowerCase &&
    hasNumbers &&
    hasSpecialChar
  );
};

export const validateUsername = (username) => {
  return /^[a-zA-Z0-9_-]{3,50}$/.test(username);
};

export const validateCodigoColaborador = (codigo) => {
  return /^\d+$/.test(codigo) && parseInt(codigo) > 0;
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