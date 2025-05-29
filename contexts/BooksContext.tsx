import { createContext, useState } from "react";
import { PropsWithChildren } from "react";
import { databases } from "../lib/appwrite";
import { COLLECTION_ID, DATABASE_ID } from "../constants/env";
import { ID, Permission, Role } from "react-native-appwrite";
import useUser from "../hooks/useUser";

interface Book {
  title: string;
  author: string;
  description: string;
}

interface BooksContextType {
  books: Book[] | null;
  fetchBooks: () => Promise<Book[] | null>;
  fetchBookById: (id: string) => Promise<Book | null>;
  createBook: (book: Book) => void;
  deleteBook: (id: string) => Promise<Book | null>;
}

export const BooksContext = createContext<BooksContextType>({
  books: [],
  fetchBooks: async () => null,
  fetchBookById: async (id: string) => null,
  createBook: async (book: Book) => null,
  deleteBook: async (id: string) => null,
});

type BooksContextProps = PropsWithChildren;

export function BooksProvider({ children }: BooksContextProps) {
  const [books, setBooks] = useState<Book[] | null>([]);
  const { user } = useUser();

  try {
  } catch (error) {
    console.error("Error initializing BooksProvider:", error);
  }

  async function fetchBooks(): Promise<Book[] | null> {
    try {
      return null;
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

  async function createBook(book: Book): Promise<void> {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...book, userId: user.$id },
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
    } catch (error) {
      console.error("Failed to create book:", error);
    }
    return Promise.resolve();
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
