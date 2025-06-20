import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import UserOnly from "../../components/auth/UserOnly";
import { BooksProvider } from "../../contexts/BooksContext";

const DashboardLayout = () => {
  const colorScheme = useColorScheme();
  const theme = Colors[colorScheme ?? "light"];

  return (
    <UserOnly>
      <BooksProvider>
        <Tabs
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: theme.navBackground,
              height: 60,
            },
            tabBarActiveTintColor: theme.iconColorFocused,
            tabBarInactiveTintColor: theme.iconColor,
          }}
        >
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "person" : "person-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="books"
            options={{
              title: "Books",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "book" : "book-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              tabBarIcon: ({ focused }) => (
                <Ionicons
                  size={24}
                  name={focused ? "add" : "add-outline"}
                  color={focused ? theme.iconColorFocused : theme.iconColor}
                />
              ),
            }}
          />
          <Tabs.Screen name="books/[id]" options={{ href: null }} />
        </Tabs>
      </BooksProvider>
    </UserOnly>
  );
};

export default DashboardLayout;
