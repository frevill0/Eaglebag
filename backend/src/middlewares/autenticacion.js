import jwt from 'jsonwebtoken';

// Definir roles válidos como constantes
export const ROLES = {
  ADMIN: 'administrador',
  OPERADOR: 'operador',
  CONSULTOR: 'consultor'
};

const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ 
        error: 'No se proporcionó token de acceso' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Validar que el rol sea uno de los permitidos
    if (!Object.values(ROLES).includes(decoded.rol)) {
      return res.status(403).json({
        error: 'Rol no válido'
      });
    }

    req.usuario = decoded;
    next();
    
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expirado'
      });
    }
    
    return res.status(401).json({
      error: 'Token inválido'
    });
  }
};

// Middleware para administradores
const isAdmin = (req, res, next) => {
  if (req.usuario.rol !== ROLES.ADMIN) {
    return res.status(403).json({
      error: 'Acceso permitido solo para administradores'
    });
  }
  next();
};

// Middleware para operadores y administradores
const isOperadorOrAdmin = (req, res, next) => {
  if (![ROLES.ADMIN, ROLES.OPERADOR].includes(req.usuario.rol)) {
    return res.status(403).json({
      error: 'Acceso permitido solo para administradores y operadores'
    });
  }
  next();
};

// Middleware para validar rol en creación/actualización de usuario
const validateUserRole = (req, res, next) => {
  const { rol } = req.body;
  
  if (rol && !Object.values(ROLES).includes(rol)) {
    return res.status(400).json({
      error: 'Rol no válido. Los roles permitidos son: administrador, operador, consultor'
    });
  }
  
  // Solo administradores pueden crear otros administradores
  if (rol === ROLES.ADMIN && req.usuario?.rol !== ROLES.ADMIN) {
    return res.status(403).json({
      error: 'Solo los administradores pueden crear/modificar otros administradores'
    });
  }
  
  next();
};

// Añadir esta función al archivo de autenticación
const generateToken = (usuario) => {
  return jwt.sign(
    { 
      codigo_colaborador: usuario.codigo_colaborador.toString(),
      correo: usuario.correo,
      rol: usuario.rol 
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export { 
  verifyToken, 
  isAdmin, 
  isOperadorOrAdmin, 
  validateUserRole,
  generateToken 
};
