import { createContext, useState } from "react";
import { PropsWithChildren } from "react";

interface Book {
  title: string;
  author: string;
  description: string;
}

interface BooksContextType {
  books: Book[] | null;
  fetchBooks: () => Promise<Book[] | null>;
  fetchBookById: (id: string) => Promise<Book | null>;
  createBook: () => Promise<Book | null>;
  deleteBook: (id: string) => Promise<Book | null>;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  fetchBooks: async () => null,
  fetchBookById: async (id: string) => null,
  createBook: async () => null,
  deleteBook: async (id: string) => null,
});

type BooksContextProps = PropsWithChildren;

export function BooksProvider({ children }: BooksContextProps) {
  const [books, setBooks] = useState<Book[] | null>([]);

  try {
  } catch (error) {
    console.error("Error initializing BooksProvider:", error);
  }

  async function fetchBooks(): Promise<Book[] | null> {
    try {
      const response = await fetch(`https://api.example.com/books`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const book: Book[] = await response.json();
      return book;
    } catch (error) {
      console.error("Failed to fetch book:", error);
      return null;
    }
  }

  async function fetchBookById(id: string): Promise<Book | null> {
    try {
      const response = await fetch(`https://api.example.com/books/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const book: Book = await response.json();
      return book;
    } catch (error) {
      console.error("Failed to fetch book:", error);
      return null;
    }
  }

  async function createBook(): Promise<Book | null> {
    try {
      const response = await fetch(`https://api.example.com/books`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const book: Book = await response.json();
      return book;
    } catch (error) {
      console.error("Failed to create book:", error);
      return null;
    }
  }

  async function deleteBook(id: string) {
    try {
      const response = await fetch(`https://api.example.com/books/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const book: Book = await response.json();
      return book;
    } catch (error) {
      console.error("Failed to delete book:", error);
      return null;
    }
  }

  return (
    <BooksContext.Provider
      value={{
        books,
        fetchBooks,
        fetchBookById,
        createBook,
        deleteBook,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
}
