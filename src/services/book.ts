import prisma from "../index";
import { Book } from "../types/book";

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
    throw new Error("Could not fetch the books");
  }
};

export const getSingleBookPrisma = async (bookId: number): Promise<Book> => {
  try {
    const bookFromDb: Book | null = await prisma.book.findUnique({
      where: { id: bookId },
    });

    if (!bookFromDb) {
      throw new Error(`Boom with the id of ${bookId} does not exist`);
    }

    const book: Book = {
      ...bookFromDb,
      publishedDate: new Date(bookFromDb.publishedDate),
    };
    return book;
  } catch (error) {
    console.log(error);
    throw new Error("Could not fetch book");
  }
};

export const createBookPrisma = async (props: Book): Promise<Book> => {
  try {
    const { title, author, publishedDate, genre, isRead } = props;
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
    throw new Error("Could not create book");
  }
};

export const deleteBookPrisma = async (bookId: number): Promise<Book> => {
  const deletedBook: Book = await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
  const book: Book = {
    ...deletedBook,
    publishedDate: new Date(deletedBook.publishedDate),
  };
  return book;
};

export const updateBookPrisma = async (bookId: number, props: Partial<Book>): Promise<Book> => {
  const { title, author, publishedDate, genre, isRead } = props;
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
};
