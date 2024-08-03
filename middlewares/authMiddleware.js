
const isAuthenticated = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  next();
}


module.exports = isAuthenticated;
  