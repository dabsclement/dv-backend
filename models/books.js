const Joi = require("joi");

const mongoose = require("mongoose");

const Book = mongoose.model(
  "Book",
  new mongoose.Schema({
    Title: {
      type: String,
      required: true,
    },
    bookCover: {
      type: String,
      required: true,
    },
    bookUrl: {
      type: String,
      required: true,
    },
  })
);

const validateBook = (book) => {
  const schema = Joi.object({
    Title: Joi.string().min(5).max(3000).required(),
    bookCover: Joi.string().min(5).max(3000).required(),
    bookUrl: Joi.string().min(5).max(3000).required(),
  });
  return schema.validate(book);
};
exports.Book = Book;
exports.validate = validateBook;
