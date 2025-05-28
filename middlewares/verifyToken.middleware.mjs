import jwt from "jsonwebtoken";
import httpStatusText from "../utils/httpStatusText.mjs";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.split(" ")[1];
  if (!token) {
    return res.status(401).send({
      status: httpStatusText.UNAUTHORIZED,
      message: "Access denied. No token provided.",
    });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(400).send({
      status: httpStatusText.BAD_REQUEST,
      message: "Invalid token.",
    });
  }
};

export default verifyToken;
