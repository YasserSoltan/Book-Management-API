import { body } from "express-validator";

export default () => {
  return [
    body("title")
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters long"),
    body("author")
      .notEmpty()
      .withMessage("Author is required")
      .isString()
      .withMessage("Author must be a string"),
  ];
};
