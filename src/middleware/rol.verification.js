// auth.middleware.js
export function requireUser(req, res, next) {

  const user = req.user;
  if (user.user.rol === "user") {
    return next();
  }
  if (user.user.rol === "premium") {
    return next();
  } else {
    return res.status(403).json({ error: "Access denied. Only users are allowed." });
  }
}

export function requireAdmin(req, res, next) {
  const user = req.user;
  if (user.user.rol === "admin") {
    return next();
  }
  if (user.user.rol === "premium") {
    return next();
  } else {
    return res.status(403).json({ error: "Access denied. Only admins are allowed." });
  }
}

export function requirePremium(req, res, next) {
  const user = req.user;
  if (user.user.rol === "premium") {
    return next();
  } else {
    return res.status(403).json({ error: "Access denied. Only premium are allowed." });
  }
}
