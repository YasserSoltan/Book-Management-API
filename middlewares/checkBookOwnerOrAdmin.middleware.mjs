import Book from "../models/book.model.mjs";
import httpStatusText from "../utils/httpStatusText.mjs";

const checkBookOwner = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: httpStatusText.NOT_FOUND,
        message: "Book not found",
      });
    }
    if (
      book.createdBy.toString() === req.user._id ||
      req.user.role === "admin"
    ) {
      return next();
    }
    return res.status(403).json({
      status: httpStatusText.FORBIDDEN,
      message: "You are not authorized to perform this action",
    });
  } catch (err) {
    return res.status(500).json({
      status: httpStatusText.ERROR,
      message: "Internal server error",
    });
  }
};

export default checkBookOwner;
