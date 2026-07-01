import { Stack } from "expo-router";
import "../../global.css";

import { AppThemeProvider } from "@/contexts/AppThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="signup" />
          <Stack.Screen name="dashboard" />
        </Stack>
      </AuthProvider>
    </AppThemeProvider>
  );
}
