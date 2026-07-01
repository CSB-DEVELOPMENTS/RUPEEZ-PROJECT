import { Stack } from "expo-router";
import "../../global.css";

import { AppThemeProvider } from "@/contexts/AppThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <AuthProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(public)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </AuthProvider>
    </AppThemeProvider>
  );
}
