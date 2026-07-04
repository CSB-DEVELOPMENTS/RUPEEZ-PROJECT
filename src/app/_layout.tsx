import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../../global.css";

import { AppThemeProvider } from "@/contexts/AppThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <AuthProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(public)" />
            <Stack.Screen name="(protected)" />
          </Stack>
        </AuthProvider>
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
