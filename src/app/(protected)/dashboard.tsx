import { Text, View } from "react-native";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Dashboard() {
  return (
    <View className="flex-1 flex-row bg-app-bg">
      <Sidebar />
      <View className="flex-1 items-center justify-center">
        <Text className="font-display text-2xl font-semibold text-app-text">
          Dashboard
        </Text>
      </View>
    </View>
  );
}
