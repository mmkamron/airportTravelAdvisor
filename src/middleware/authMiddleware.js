import { verify } from "../util/jwt.js";

const authMiddleware = (req, res, next) => {
  const authorizationHeader = req.header.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization header is invalid" });
  }
  const token = authorizationHeader.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization token is not found" });
  }
  const decoded = verify(token, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Refresh token is invalid" });
    }
    req.user = decoded;
    next();
  });
};

export default authMiddleware;
