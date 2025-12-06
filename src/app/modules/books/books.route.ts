import express from "express";
import { BooksController } from "./books.controller";


export const booksRouter = express.Router();

booksRouter.get("/", BooksController.getAllBooks);
booksRouter.post("/create-book", BooksController.createBook);
booksRouter.get("/:bookId", BooksController.getSingleBook);
booksRouter.patch("/:bookId", BooksController.updateBook);
booksRouter.delete("/:bookId", BooksController.deleteBook);
