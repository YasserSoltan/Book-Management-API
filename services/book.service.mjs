import Book from "../models/book.model.mjs";

export const getAllBooks = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await Book.find({}, { __v: 0 }).skip(skip).limit(limit);
};

export const getUserBooks = async (userId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return await Book.find({ createdBy: userId }, { __v: 0 }).skip(skip).limit(limit);
}

export const getBookById = async (bookId) => {
  return await Book.findById(bookId);
};

export const createBook = async ({ title, author, userId, coverImage }) => {
  const newBook = new Book({
    title,
    author,
    coverImage,
    createdBy: userId,
  });
  return await newBook.save();
};

export const updateBook = async (bookId, { title, author }, coverImage) => {
  return await Book.findByIdAndUpdate(
    bookId,
    { title, author, coverImage },
    { new: true }
  );
};

export const deleteBook = async (bookId) => {
  return await Book.deleteOne({ _id: bookId });
};
