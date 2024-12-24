import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { LogBox } from "react-native";
import "react-native-reanimated";
import { ToastProvider } from "react-native-toast-notifications";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <ToastProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(routes)/welcome-intro/index" />
        <Stack.Screen name="(routes)/login/index" />
        <Stack.Screen name="(routes)/sign-up/index" />
        <Stack.Screen name="(routes)/forgot-password/index" />
        <Stack.Screen
          name="(routes)/course-details/index"
          options={{
            headerShown: true,
            title: "Chi tiết môn học",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/cart/index"
          options={{
            headerShown: true,
            title: "Cart Items",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/profile-details/index"
          options={{
            headerShown: true,
            title: "Thông tin cá nhân",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/scoreboard/index"
          options={{
            headerShown: true,
            title: "Bảng điểm",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/scoreboard/semester/index"
          options={{
            headerShown: true,
            title: "Bảng điểm",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/schedule/index"
          options={{
            headerShown: true,
            title: "Thời khóa biểu",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/course-access/index"
          options={{
            headerShown: true,
            title: "Course Lessons",
            headerBackTitle: "Quay lại",
          }}
        />
        <Stack.Screen
          name="(routes)/study-path/index"
          options={{
            headerShown: true,
            title: "Đề xuất lộ trình",
            headerBackTitle: "Quay lại",
          }}
        />
      </Stack>
    </ToastProvider>
  );
}
