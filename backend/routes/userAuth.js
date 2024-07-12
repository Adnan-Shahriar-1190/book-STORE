const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("Token is missing");
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, "bookStore123", (err, user) => {
    if (err) {
      console.log("Token verification failed:", err.message);
      return res.status(403).json({ message: "Token Expired.Please LogIn." });
    }
    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
