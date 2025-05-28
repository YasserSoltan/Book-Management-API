import express from "express";
import * as bookController from "../controllers/book.controller.mjs";
import upload from "../middlewares/upload.middleware.mjs";
import verifyToken from "../middlewares/verifyToken.middleware.mjs";
import allowedTo from "../middlewares/allowedTo.middleware.mjs";
import userRoles from "../utils/userRoles.mjs";
import bookValidationSchemaMiddleware from "../middlewares/bookValidationSchema.middleware.mjs";
import checkBookOwnerOrAdmin from "../middlewares/checkBookOwnerOrAdmin.middleware.mjs";

const bookRouter = express.Router();

bookRouter
  .route("/")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    bookController.getBooks
  )
  .post(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    bookValidationSchemaMiddleware(),
    upload.single("coverImage"),
    bookController.createBook
  );

bookRouter
  .route("/:id")
  .get(
    verifyToken,
    allowedTo(userRoles.ADMIN, userRoles.USER),
    checkBookOwnerOrAdmin,
    bookController.getBookById
  )
  .put(
    verifyToken,
    allowedTo(userRoles.USER),
    checkBookOwnerOrAdmin,
    bookValidationSchemaMiddleware(),
    upload.single("coverImage"),
    bookController.updateBook
  )
  .delete(verifyToken, allowedTo(userRoles.ADMIN, userRoles.USER), checkBookOwnerOrAdmin, bookController.deleteBook);

export default bookRouter;
