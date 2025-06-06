import httpStatusText from "../utils/httpStatusText.mjs";

export default (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(403).json({
        status: "error",
        message: "Forbidden: User not authenticated.",
      });
    }
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: httpStatusText.FORBIDDEN,
        message:
          "Forbidden: You do not have permission to access this resource.",
      });
    }
    next();
  };
};
