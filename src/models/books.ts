import mongoose from "mongoose";

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
    Author: {
      type: String,
      required: true,
    },
  })
);


export default Book;
