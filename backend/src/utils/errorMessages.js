export const ERROR_MESSAGES = {
  REQUIRED_FIELDS: {
    codigo_colaborador: 'El código de colaborador es obligatorio',
    nombre_usuario: 'El nombre de usuario es obligatorio',
    correo: 'El correo electrónico es obligatorio',
    contrasena: 'La contraseña es obligatoria',
    codigo_socio: 'El código de socio es obligatorio',
    nombres_completos: 'El nombre completo es obligatorio',
    cedula: 'La cédula es obligatoria'
  },
  INVALID_FORMAT: {
    correo: 'El formato del correo electrónico no es válido (ejemplo: usuario@dominio.com)',
    contrasena: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
    codigo_colaborador: 'El código de colaborador debe ser un número válido',
    nombre_usuario: 'El nombre de usuario solo puede contener letras, números y guiones bajos',
    cedula: 'El formato de la cédula no es válido',
    telefono: 'El formato del teléfono no es válido (ejemplo: 0991234567)'
  },
  DUPLICATE: {
    codigo_colaborador: 'Este código de colaborador ya está registrado en el sistema',
    correo: 'Este correo electrónico ya está registrado en el sistema',
    nombre_usuario: 'Este nombre de usuario ya está en uso',
    codigo_socio: 'Este código de socio ya está registrado',
    cedula: 'Esta cédula ya está registrada',
    correo_socio: 'Este correo ya está registrado para otro socio'
  },
  AUTH: {
    invalid_credentials: 'Las credenciales proporcionadas son incorrectas',
    inactive_user: 'Tu cuenta está inactiva',
    session_expired: 'Tu sesión ha expirado',
    unauthorized: 'No tienes autorización para realizar esta acción'
  },
  ROLES: {
    invalid_role: 'El rol especificado no es válido. Los roles permitidos son: ADMIN, OPERADOR y CONSULTOR',
    admin_only: 'Esta acción solo puede ser realizada por un administrador',
    insufficient_permissions: 'No tienes permisos suficientes para realizar esta acción'
  },
  UPDATE: {
    not_found: 'El usuario que intentas actualizar no existe',
    no_changes: 'No se proporcionaron campos para actualizar',
    invalid_status: 'El estado debe ser 0 (inactivo) o 1 (activo)',
    socio_not_found: 'El socio que intentas actualizar no existe'
  },
  DELETE: {
    not_found: 'El usuario que intentas eliminar no existe',
    self_delete: 'No puedes eliminar tu propia cuenta',
    admin_delete: 'No puedes eliminar una cuenta de administrador',
    socio_not_found: 'El socio que intentas eliminar no existe',
    has_talegas: 'No se puede eliminar el socio porque tiene talegas asociadas'
  }
}; 