import { createContext, useMemo, useState, type PropsWithChildren } from "react";
import { useColorScheme, View } from "react-native";

type AppTheme = "light" | "dark";

type AppThemeContextValue = {
  theme: AppTheme;
  setTheme: (theme: AppTheme) => void;
};

export const AppThemeContext = createContext<AppThemeContextValue | null>(null);

export function AppThemeProvider({ children }: PropsWithChildren) {
  const systemTheme = useColorScheme();
  const [theme, setTheme] = useState<AppTheme>(systemTheme === "dark" ? "dark" : "light");

  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <AppThemeContext.Provider value={value}>
      <View className={`${theme} flex-1 bg-app-bg`}>{children}</View>
    </AppThemeContext.Provider>
  );
}
