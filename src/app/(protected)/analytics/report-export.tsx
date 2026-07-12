import { ScrollView, View } from "react-native";

import { AnalyticsFlowHero, ReportsExportList } from "@/components/analytics";
import { REPORTS_EXPORT_PAGE } from "@/constants/analytics";

export default function ReportExportScreen() {
  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="mx-auto w-full max-w-5xl px-4 py-6 md:px-8 md:py-8 lg:px-10">
        <View className="relative overflow-hidden p-4 md:p-6">
          <View className="absolute -left-10 top-16 h-40 w-40 rounded-full bg-app-primary/10" />
          <View className="absolute -right-10 top-10 h-48 w-48 rounded-full bg-app-brand/10" />

          <View className="relative gap-6">
            <AnalyticsFlowHero
              subtitle={REPORTS_EXPORT_PAGE.subtitle}
              title={REPORTS_EXPORT_PAGE.title}
            />

            <ReportsExportList items={REPORTS_EXPORT_PAGE.items} />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
