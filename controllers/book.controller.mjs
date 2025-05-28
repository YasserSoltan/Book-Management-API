import httpStatusText from "../utils/httpStatusText.mjs";
import * as bookService from "../services/book.service.mjs";

export const getBooks = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    let books = [];
    if(req.user.role === "admin") {
      books = await bookService.getAllBooks(page, limit);
    }else if(req.user.role === "user") {
      books = await bookService.getUserBooks(req.user._id, page, limit);
    }
    res.json({
      status: httpStatusText.SUCCESS,
      result: books.length,
      data: { books },
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};

export const getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({
        status: httpStatusText.NOT_FOUND,
        message: "Book not found",
      });
    }
    res.json({
      status: httpStatusText.SUCCESS,
      data: { book },
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};

export const createBook = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(401).json({
        status: httpStatusText.UNAUTHORIZED,
        message: "User not authenticated",
      });
    }
    const { title, author } = req.body;
    const coverImage = req.file?.path;
    const book = await bookService.createBook({ title, author, userId, coverImage });
    console.log("Book created:", book);
    res.status(201).json({
      status: httpStatusText.CREATED,
      data: { book },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.FAIL,
      message: error.message,
    });
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const coverImage = req.file?.path;
    const book = await bookService.updateBook(
      req.params.id,
      { title, author },
      coverImage
    );
    if (!book) {
      return res.status(404).json({
        status: httpStatusText.NOT_FOUND,
        message: "Book not found",
      });
    }
    res.json({
      status: httpStatusText.SUCCESS,
      data: { book },
    });
  } catch (error) {
    res.status(400).json({
      status: httpStatusText.FAIL,
      message: error.message,
    });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const result = await bookService.deleteBook(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: httpStatusText.NOT_FOUND,
        message: "Book not found",
      });
    }
    res.json({
      status: httpStatusText.SUCCESS,
      message: "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: httpStatusText.ERROR,
      message: error.message,
    });
  }
};