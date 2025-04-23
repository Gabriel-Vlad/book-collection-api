import prisma from "../index";
import { Book } from "../types/book";
import { NotFound, BadRequest, InternalServerError } from "../errors";

export const getAllBooksPrisma = async (): Promise<Book[]> => {
  try {
    const booksFromDb: Book[] = await prisma.book.findMany({
      orderBy: { id: "asc" },
    });

    const books: Book[] = booksFromDb.map((book) => ({
      ...book,
      publishedDate: new Date(book.publishedDate),
    }));
    return books;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Internal error occurred while fetching the books");
  }
};

export const getSingleBookPrisma = async (bookId: number): Promise<Book> => {
  try {
    const bookFromDb: Book | null = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!bookFromDb) {
      throw new NotFound(`Book with the id of: ${bookId} does not exist`);
    }

    const book: Book = {
      ...bookFromDb,
      publishedDate: new Date(bookFromDb.publishedDate),
    };
    return book;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Internal error occurred while fetching the book");
  }
};

export const createBookPrisma = async (props: Book): Promise<Book> => {
  try {
    const { title, author, publishedDate, genre, isRead } = props;

    if (!title || !author || !publishedDate || !genre || !isRead) {
      throw new BadRequest("Please provide data for all required fields");
    }

    const bookToDb: Book = await prisma.book.create({
      data: {
        title,
        author,
        publishedDate,
        genre,
        isRead,
      },
    });

    const book: Book = {
      ...bookToDb,
      publishedDate: new Date(bookToDb.publishedDate),
    };

    return book;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Internal error occurred while creating the book");
  }
};

export const deleteBookPrisma = async (bookId: number): Promise<Book> => {
  try {
    const deletedBook: Book = await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    if (!deletedBook) {
      throw new NotFound(`Book with the id of: ${bookId} does not exist`);
    }

    const book: Book = {
      ...deletedBook,
      publishedDate: new Date(deletedBook.publishedDate),
    };
    return book;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Internal error occurred while deleting the book");
  }
};

export const updateBookPrisma = async (bookId: number, props: Partial<Book>): Promise<Book> => {
  try {
    const { title, author, publishedDate, genre, isRead } = props;

    if (!title && !author && !publishedDate && !genre && !isRead) {
      throw new BadRequest("At least one of the fields must be updated");
    }

    const updatedBook = await prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        title,
        author,
        publishedDate,
        genre,
        isRead,
      },
    });

    const book = {
      ...updatedBook,
      publishedDate: new Date(updatedBook.publishedDate),
    };
    return book;
  } catch (error) {
    console.log(error);
    throw new InternalServerError("Internal error occurred while updating the book");
  }
};
