import express from "express";
const bookRouter = express.Router();

import {
  getAllBooks,
  getSingleBook,
  createBook,
  deleteBook,
  updateBook,
} from "../controllers/books";

bookRouter.route("/").get(getAllBooks).post(createBook);
bookRouter.route("/:id").get(getSingleBook).patch(updateBook).delete(deleteBook);

export default bookRouter;
