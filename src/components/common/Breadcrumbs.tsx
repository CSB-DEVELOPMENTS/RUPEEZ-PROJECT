import type { BreadcrumbItem } from "@/types/navigation";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";

type BreadcrumbsProps = { items: BreadcrumbItem[] };

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const router = useRouter();

  if (!items.length) {
    return null;
  }

  return (
    <View className="flex-row flex-wrap items-center gap-2">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <View key={`${item.label}-${index}`} className="flex-row items-center gap-2">
            {item.href && !isLast ?
              <Pressable onPress={() => router.push(item.href)}>
                <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
                  {item.label}
                </Text>
              </Pressable>
            : <Text
                className={`font-display text-xs font-semibold uppercase tracking-[1.8px] ${
                  isLast ? "text-app-primary" : "text-app-muted"
                }`}>
                {item.label}
              </Text>
            }

            {!isLast ?
              <Text className="font-display text-xs font-semibold uppercase tracking-[1.8px] text-app-muted">
                /
              </Text>
            : null}
          </View>
        );
      })}
    </View>
  );
}
