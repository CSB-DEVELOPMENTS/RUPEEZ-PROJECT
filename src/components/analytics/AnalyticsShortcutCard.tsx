import { Href, useRouter } from "expo-router";
import { Pressable, Text } from "react-native";

type AnalyticsShortcutCardProps = {
  description: string;
  href: Href;
  title: string;
};

export function AnalyticsShortcutCard({ description, href, title }: AnalyticsShortcutCardProps) {
  const router = useRouter();

  return (
    <Pressable
      accessibilityHint={`Opens ${title}`}
      accessibilityRole="button"
      className="min-h-[130px] flex-1 rounded-[24px] border border-app-border bg-app-surface p-5 shadow-showcase-soft dark:shadow-showcase-soft-dark"
      onPress={() => router.push(href)}>
      <Text className="font-display text-lg font-semibold text-app-text">{title}</Text>
      <Text className="mt-2 font-display text-sm leading-5 text-app-muted">{description}</Text>
    </Pressable>
  );
}
