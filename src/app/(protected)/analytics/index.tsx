import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

export default function Analytics() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-app-bg gap-5">
      <Text className="font-display text-2xl font-semibold text-app-text">Analytics</Text>
      <Pressable onPress={() => router.push("/analytics/financial-health")}>
        <Text className="text-app-text">Financial Health</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/analytics/report-export")}>
        <Text className="text-app-text">Reports</Text>
      </Pressable>
      <Pressable onPress={() => router.push("/analytics/snakey-flow")}>
        <Text className="text-app-text">Snakey flow</Text>
      </Pressable>
    </View>
  );
}
