const { Book, validate } = require("../models/books");

exports.uploadBook = async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let book = new Book(req.body);
  book = await book.save();

  res.send(book);
};
