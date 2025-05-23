import { useRouter } from "expo-router";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { Text } from "react-native";

export default function GuestOnly({ children }: { children: React.ReactNode }) {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && user) {
      router.replace("/profile");
    }
  }, [user, authChecked]);

  if (authChecked || user) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>;
}
