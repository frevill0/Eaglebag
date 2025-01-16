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