import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export function DropDownMenu({
  isOpen,
  label,
  onSelect,
  onToggle,
  options,
  value,
  enableSearch = false,
}: {
  isOpen: boolean;
  label: string;
  onSelect: (nextValue: string) => void;
  onToggle: () => void;
  options: string[];
  value: string;
  enableSearch?: boolean;
}) {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
  const [searchQuery, setSearchQuery] = useState("");

  const handleToggle = () => {
    setSearchQuery("");
    onToggle();
  };

  const filteredOptions =
    enableSearch ?
      options.filter((option) => option.toLowerCase().includes(searchQuery.trim().toLowerCase()))
    : options;

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

      {/* {isOpen ?
        <View className="absolute left-0 right-0 top-full z-20 mt-2 rounded-[20px] border border-app-border bg-app-surface p-2 shadow-showcase-soft dark:shadow-showcase-soft-dark">
          <ScrollView
            className="max-h-64"
            keyboardShouldPersistTaps="handled"
            nestedScrollEnabled
            showsVerticalScrollIndicator>
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
                      <MaterialCommunityIcons color={colors.primary} name="check" size={18} />
                    : null}
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      : null} */}
      <Modal visible={isOpen} transparent={true} animationType="fade" onRequestClose={handleToggle}>
        <Pressable
          className={`${theme} flex-1 items-center justify-center bg-app-bg/70 px-4`}
          onPress={handleToggle}>
          <Pressable
            className="w-full max-w-96 rounded-[20px] border border-app-border bg-app-surface p-2 shadow-showcase-soft dark:shadow-showcase-soft-dark"
            onPress={(e) => e.stopPropagation()}>
            {enableSearch ?
              <View className="mb-2 flex-row items-center gap-2 rounded-2xl border border-app-border bg-app-panel/70 px-3">
                <MaterialCommunityIcons color={colors.textSoft} name="magnify" size={18} />
                <TextInput
                  autoFocus
                  className="flex-1 py-3 font-display text-base text-app-text focus:outline-none"
                  onChangeText={setSearchQuery}
                  placeholder="Search options"
                  placeholderTextColor={colors.textSoft}
                  value={searchQuery}
                />
              </View>
            : null}
            <ScrollView
              className="max-h-64"
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator>
              {filteredOptions.map((option) => {
                const isSelected = option === value;
                return (
                  <Pressable
                    key={option}
                    className={`rounded-2xl px-3 py-3 hover:bg-app-primary/10 ${isSelected ? "bg-app-primary/10" : ""}`}
                    onPress={() => {
                      setSearchQuery("");
                      onSelect(option);
                    }}>
                    <View className="flex-row items-center gap-3">
                      <Text className="flex-1 font-display text-base text-app-text">{option}</Text>
                      {isSelected ?
                        <MaterialCommunityIcons color={colors.primary} name="check" size={18} />
                      : null}
                    </View>
                  </Pressable>
                );
              })}
              {enableSearch && filteredOptions.length === 0 ?
                <Text className="px-3 py-4 text-center font-display text-sm text-app-muted">
                  No options found
                </Text>
              : null}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
