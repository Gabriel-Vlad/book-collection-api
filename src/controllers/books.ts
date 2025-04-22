import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { Book } from "../types/book";
import {
  getAllBooksPrisma,
  getSingleBookPrisma,
  createBookPrisma,
  deleteBookPrisma,
  updateBookPrisma,
} from "../services/book";

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  const books: Book[] = await getAllBooksPrisma();
  res.status(StatusCodes.OK).json({ books });
};

export const getSingleBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const book: Book = await getSingleBookPrisma(Number(id));
  res.status(StatusCodes.OK).json({ book });
};

export const createBook = async (req: Request, res: Response): Promise<void> => {
  const book: Book = await createBookPrisma({ ...req.body });
  res.status(StatusCodes.CREATED).json({ book });
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const book: Book = await deleteBookPrisma(Number(id));
  res.status(StatusCodes.OK).json({ book });
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const book: Book = await updateBookPrisma(Number(id), { ...req.body });
  res.status(StatusCodes.OK).json({ book });
};
