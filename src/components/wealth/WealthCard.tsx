import { View } from "react-native";

export function WealthCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <View className={`rounded-[16px] border border-app-border bg-app-surface p-6 ${className}`}>
      {children}
    </View>
  );
}
