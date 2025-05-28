import { Client, Account, Avatars, Databases } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint(process.env.EXPO_PUBLIC_API_URL!)
  .setProject(process.env.EXPO_PUBLIC_PROJECT_ID!)
  .setPlatform(process.env.EXPO_PUBLIC_PLATFORM_ID!);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
