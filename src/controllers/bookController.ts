import { Request, Response } from "express";
import Book from "@models/books";
import { validateBook } from "@helpers/validate";

export const uploadBook = async (req: Request, res: Response) => {
  const { error } = validateBook(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let book = new Book(req.body);
  book = await book.save();

  res.send(book);
};
