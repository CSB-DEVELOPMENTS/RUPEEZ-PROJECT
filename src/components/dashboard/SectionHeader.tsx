import { Href, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function SectionHeader({
  action,
  actionHref,
  eyebrow,
  title,
  filterRanges,
}: {
  action?: string;
  actionHref?: Href;
  eyebrow?: string;
  title: string;
  filterRanges?: string[];
}) {
  const [selectedRange, setSelectedRange] = useState<string>("1M");
  const router = useRouter();

  return (
    <View className="mb-5 gap-4">
      <View className="flex-row items-start gap-4 justify-between">
        <View className="gap-1">
          <Text className="font-display text-xl md:text-2xl font-semibold tracking-tight text-app-text">
            {title}
          </Text>
          {eyebrow ? (
            <Text className="font-display text-base text-app-muted">{eyebrow}</Text>
          ) : null}
        </View>
        {action ? (
          actionHref ? (
            <Pressable
              accessibilityHint="Opens this detail page"
              accessibilityRole="button"
              onPress={() => router.push(actionHref)}>
              <Text className="font-display text-sm font-semibold text-app-primary-strong">
                {action}
              </Text>
            </Pressable>
          ) : (
            <Text className="font-display text-sm font-semibold text-app-primary-strong">
              {action}
            </Text>
          )
        ) : null}
      </View>
      {filterRanges && (
        <View className="flex-row flex-wrap gap-2">
          {filterRanges.map((range) => {
            const isActive = range === selectedRange;

            return (
              <Pressable
                key={range}
                className={`rounded-2xl px-4 py-2 ${isActive ? "bg-app-panel" : "bg-app-panel/35"}`}
                onPress={() => setSelectedRange(range)}>
                <Text
                  className={`font-display text-sm font-semibold uppercase tracking-[1.2px] ${
                    isActive ? "text-app-text" : "text-app-muted"
                  }`}>
                  {range}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}
