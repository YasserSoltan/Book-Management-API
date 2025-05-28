import { body } from "express-validator";

export default () => {
  return [
    body("firstName")
      .notEmpty()
      .withMessage("first name is required")
      .isLength({ min: 3 })
      .withMessage("first name must be at least 3 characters long"),
    body("lastName")
      .notEmpty()
      .withMessage("last name is required")
      .isLength({ min: 3 })
      .withMessage("last name must be at least 3 characters long"),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Email must be a valid email address"),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("role")
      .optional(true)
      .isIn(["USER", "ADMIN", "MODERATOR"])
      .withMessage("Role must be one of the following: USER, ADMIN, MODERATOR"),
  ];
};
