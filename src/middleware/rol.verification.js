// auth.middleware.js
export function requireUser(req, res, next) {
  console.log('req.user',req.user)
    const user = req.user; // Suponiendo que has autenticado al usuario y guardado su información en req.user
    if (user.user.rol === "user") {
      next(); // Permite el acceso a la ruta si el usuario es un "usuario"
    } else {
      res.status(403).json({ error: 'Access denied. Only users are allowed.' });
    }
  }
  
  export function requireAdmin(req, res, next) {
    const user = req.user;
    if (user.user.rol === "admin") {
      next(); // Permite el acceso a la ruta si el usuario es un "administrador"
    } else {
      res.status(403).json({ error: 'Access denied. Only admins are allowed.' });
    }
  }
  