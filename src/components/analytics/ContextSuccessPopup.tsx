import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Text, View } from "react-native";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import type { ContextSuccessData } from "@/types/contexts-switching";

import { ContextPopupButton } from "./ContextPopupButtons";
import { ContextPopupShell } from "./ContextPopupShell";

type ContextSuccessPopupProps = {
  data: ContextSuccessData;
  onBack: () => void;
  onClose: () => void;
  onGoToContext: () => void;
  visible: boolean;
};

export function ContextSuccessPopup({
  data,
  onBack,
  onClose,
  onGoToContext,
  visible,
}: ContextSuccessPopupProps) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <ContextPopupShell visible={visible} onClose={onClose} maxWidthClassName="max-w-md">
      <View className="p-6">
        <View className="flex-row items-center justify-between">
          <MaterialCommunityIcons name="arrow-left" size={24} color={colors.text} onPress={onBack} />
          <View className="items-center">
            <Text className="font-display text-lg font-semibold tracking-tight text-app-text">
              New Context
            </Text>
            <Text className="font-display text-xs font-semibold text-app-muted">Step 3 of 3</Text>
          </View>
          <MaterialCommunityIcons name="close" size={24} color={colors.text} onPress={onClose} />
        </View>

        <View className="items-center gap-7 py-8">
          <View className="h-32 w-32 items-center justify-center rounded-[32px] bg-app-brand">
            <MaterialCommunityIcons
              name="chart-line-variant"
              size={58}
              color={colors.primaryContrast}
            />
          </View>

          <View className="items-center">
            <Text className="text-center font-display text-2xl font-semibold tracking-tight text-app-text">
              {data.contextName}
            </Text>
            <Text className="text-center font-display text-2xl font-semibold tracking-tight text-app-primary">
              is ready to go!
            </Text>
          </View>
        </View>

        <View className="gap-4">
          {data.checks.map((check) => (
            <View key={check} className="flex-row items-center gap-4">
              <View className="h-6 w-6 items-center justify-center rounded-full border border-app-primary/50 bg-app-primary/15">
                <MaterialCommunityIcons name="check" size={16} color={colors.primary} />
              </View>
              <Text className="font-display text-base text-app-muted">{check}</Text>
            </View>
          ))}
        </View>

        <View className="mt-10 gap-5">
          <ContextPopupButton label="Go to Context" onPress={onGoToContext} />
          <ContextPopupButton label="Back to Dashboard" tone="ghost" onPress={onClose} />
        </View>
      </View>
    </ContextPopupShell>
  );
}
