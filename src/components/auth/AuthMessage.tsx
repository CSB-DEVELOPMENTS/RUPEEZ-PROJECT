import { Text, View } from "react-native";

type AuthMessageProps = {
  tone: "error" | "info" | "success";
  message: string;
};

export function AuthMessage({ tone, message }: AuthMessageProps) {
  const bgClassName =
    tone === "error"
      ? "border-app-danger/30 bg-app-danger-muted/30"
      : tone === "success"
        ? "border-app-primary/30 bg-app-primary-muted/60"
        : "border-app-primary/20 bg-app-primary-muted/50";

  const textClassName =
    tone === "error"
      ? "text-app-danger"
      : tone === "success"
        ? "text-app-primary-strong"
        : "text-app-primary-strong";

  return (
    <View className={`rounded-2xl border px-4 py-3 ${bgClassName}`}>
      <Text className={`font-display text-base leading-6 ${textClassName}`}>{message}</Text>
    </View>
  );
}
