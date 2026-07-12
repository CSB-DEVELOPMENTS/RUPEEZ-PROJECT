import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

export function DropDownMenu({
  isOpen,
  label,
  onSelect,
  onToggle,
  options,
  value,
}: {
  isOpen: boolean;
  label: string;
  onSelect: (nextValue: string) => void;
  onToggle: () => void;
  options: string[];
  value: string;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];

  return (
    <View className={`relative ${isOpen ? "z-20" : "z-0"}`}>
      <View className="gap-2">
        <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
          {label}
        </Text>
        <Pressable
          className="min-h-[3.5rem] rounded-[20px] border border-app-border bg-app-panel/70 px-4 py-4"
          onPress={onToggle}>
          <View className="flex-row items-center gap-3">
            <Text className="flex-1 font-display text-lg leading-7 text-app-text">{value}</Text>
            <MaterialCommunityIcons
              color={colors.textSoft}
              name={isOpen ? "chevron-up" : "chevron-down"}
              size={18}
            />
          </View>
        </Pressable>
      </View>

      {isOpen ?
        <View className="absolute left-0 right-0 top-full z-20 mt-2 rounded-[20px] border border-app-border bg-app-surface p-2 shadow-showcase-soft dark:shadow-showcase-soft-dark">
          {options.map((option) => {
            const isSelected = option === value;

            return (
              <Pressable
                key={option}
                className={`rounded-2xl px-3 py-3 ${isSelected ? "bg-app-primary/10" : ""}`}
                onPress={() => onSelect(option)}>
                <View className="flex-row items-center gap-3">
                  <Text className="flex-1 font-display text-base text-app-text">{option}</Text>
                  {isSelected ?
                    <MaterialCommunityIcons
                      color={colors.primary}
                      name={"check" as never}
                      size={18}
                    />
                  : null}
                </View>
              </Pressable>
            );
          })}
        </View>
      : null}
    </View>
  );
}
