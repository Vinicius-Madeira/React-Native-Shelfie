import { createContext, useEffect, useState } from "react";
import { PropsWithChildren } from "react";
import { databases, client } from "../lib/appwrite";
import { COLLECTION_ID, DATABASE_ID } from "../constants/env";
import { ID, Permission, Query, Role } from "react-native-appwrite";
import useUser from "../hooks/useUser";

interface Book {
  title: string;
  author: string;
  description: string;
}

interface BooksContextType {
  books: Book[] | null;
  fetchBooks: () => void;
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

  async function fetchBooks(): Promise<void> {
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
        [Query.equal("userId", user.$id)]
      );

      setBooks(response.documents as unknown as Book[]);
      console.log(response.documents);
    } catch (error) {
      console.error("Failed to fetch books:", error);
      return;
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

  useEffect(() => {
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        const { payload, events } = response;

        if (events[0].includes("create")) {
          setBooks((prevBooks) => [...prevBooks, payload as Book]);
        }
      });
    } else {
      setBooks(null);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [user]);

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
