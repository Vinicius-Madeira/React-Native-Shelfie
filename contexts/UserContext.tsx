import { createContext, PropsWithChildren, useState } from "react";
import { account } from "../lib/appwrite";
import { ID, Models } from "react-native-appwrite";

type User = Models.User<Models.Preferences>;

export const UserContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}>({
  user: null,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: async () => {},
});

type UserContextProps = PropsWithChildren;

export function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();

      setUser(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function register(email: string, password: string) {
    try {
      await account.create(ID.unique(), email, password);
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    setUser(null);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
