import httpStatusText from "../utils/httpStatusText.mjs";
import * as authService from "../services/user.service.mjs";

export const register = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);

    res.status(201).json({
      status: httpStatusText.CREATED,
      data: { user },
    });
  } catch (error) {
    const statusCode = error.message === "User already exists" ? 400 : 500;

    res.status(statusCode).json({
      status: httpStatusText.FAIL,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await authService.loginUser(email, password);
    res.json({
      status: httpStatusText.SUCCESS,
      data: { token, user },
    });
  } catch (error) {
    res.status(401).json({
      status: httpStatusText.UNAUTHORIZED,
      message: error.message,
    });
  }
};
