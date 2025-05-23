import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import { ID, Models } from "react-native-appwrite";

type User = Models.User<Models.Preferences>;

type UserContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  authChecked: boolean;
};

export const UserContext = createContext<UserContextType>({
  user: null,
  login: async (email: string, password: string) => {},
  register: async (email: string, password: string) => {},
  logout: async () => {},
  authChecked: false,
});

type UserContextProps = PropsWithChildren;

export function UserProvider({ children }: UserContextProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authChecked, setAuthChecked] = useState(false);

  async function login(email: string, password: string) {
    try {
      await account.createEmailPasswordSession(email, password);
      const response = await account.get();
      setUser(response);

      setUser(response);
    } catch (error: any) {
      throw Error(error.message);
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
    await account.deleteSession("current");
    setUser(null);
  }

  async function getInitialUserValue() {
    try {
      const response = await account.get();
      setUser(response);
    } catch (error) {
      setUser(null);
    } finally {
      setAuthChecked(true);
    }
  }

  useEffect(() => {
    getInitialUserValue();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        authChecked,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
