import { ScrollView, View } from "react-native";

import { AllContextsSections } from "@/components/contexts-switching";
import { ALL_CONTEXTS_PAGE } from "@/constants/contexts-switching";

export default function AllContexts() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full px-4 py-5 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-12 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-8 h-52 w-52 rounded-full bg-app-brand/10" />
          <AllContextsSections data={ALL_CONTEXTS_PAGE} />
        </View>
      </View>
    </ScrollView>
  );
}
