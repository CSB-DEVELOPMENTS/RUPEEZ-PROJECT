import { ActivityIndicator, View } from "react-native";

export function AuthGateFallback() {
  return (
    <View className="flex-1 items-center justify-center bg-app-bg">
      <ActivityIndicator size="large" />
    </View>
  );
}
