import { Client, Account, Avatars, Databases } from "react-native-appwrite";
import { API_URL, PROJECT_ID, PLATFORM_ID } from "../constants/env";

export const client = new Client()
  .setEndpoint(API_URL)
  .setProject(PROJECT_ID)
  .setPlatform(PLATFORM_ID);

export const account = new Account(client);
export const avatars = new Avatars(client);
export const databases = new Databases(client);
