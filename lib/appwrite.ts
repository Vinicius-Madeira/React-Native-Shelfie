import { Client, Account, Avatars } from "react-native-appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("680b6f9100212722089a")
  .setPlatform("com.vinimad.shelfie");

export const account = new Account(client);
export const avatars = new Avatars(client);
