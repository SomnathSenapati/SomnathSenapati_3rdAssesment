const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.session.token;
  if (!token) return res.redirect("/login");
  try {
    const decoded = jwt.verify(token, "jwtsecret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect("/login");
  }
};

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") return res.status(403).send("Access denied");
  next();
};

module.exports = { auth, isAdmin };
