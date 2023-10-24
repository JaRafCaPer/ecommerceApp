// auth.middleware.js
export function requireUser(req, res, next) {

  const user = req.user;
  if (user.user.rol === "user") {
    next();
  }
  if (user.user.rol === "premium") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Only users are allowed." });
  }
}

export function requireAdmin(req, res, next) {
  const user = req.user;
  if (user.user.rol === "admin") {
    next();
  }
  if (user.user.rol === "premium") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Only admins are allowed." });
  }
}

export function requirePremium(req, res, next) {
  const user = req.user;
  if (user.user.rol === "premium") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Only premium are allowed." });
  }
}
