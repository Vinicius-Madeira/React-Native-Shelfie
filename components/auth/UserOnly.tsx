import { useRouter } from "expo-router";
import useUser from "../../hooks/useUser";
import { useEffect } from "react";
import { Text } from "react-native";

export default function UserOnly({ children }: { children: React.ReactNode }) {
  const { user, authChecked } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (authChecked && !user) {
      router.replace("/login");
    }
  }, [user, authChecked]);

  if (!authChecked || !user) {
    return <Text>Loading...</Text>;
  }

  return <>{children}</>;
}
