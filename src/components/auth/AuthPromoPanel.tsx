import { Text, View } from "react-native";

import { BrandMark } from "@/components/landing/BrandMark";

type AuthPromoPanelProps = {
  body: string;
  insightBody: string;
  insightTitle: string;
  title: string;
};

export function AuthPromoPanel({ body, insightBody, insightTitle, title }: AuthPromoPanelProps) {
  return (
    <View className="relative min-h-[420px] overflow-hidden bg-app-bg px-8 py-10 md:px-12 lg:min-h-screen lg:px-16 lg:py-14">
      <View className="absolute inset-x-10 top-14 h-40 rounded-[40px] bg-app-bg-accent/80" />
      <View className="absolute -right-20 top-24 h-64 w-64 rounded-full bg-app-primary-muted/80" />
      <View className="absolute -left-16 bottom-20 h-56 w-56 rounded-full bg-app-primary-muted/50" />
      <View className="absolute bottom-12 right-12 h-32 w-32 rounded-[32px] border border-app-border bg-app-surface/70" />

      <View className="relative z-10">
        <BrandMark />
      </View>

      <View className="relative z-10 mt-16 max-w-xl">
        <Text className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-app-text md:text-6xl">
          {title}
        </Text>
        <Text className="mt-8 max-w-lg font-display text-2xl leading-10 text-app-muted">
          {body}
        </Text>
      </View>

      <View className="relative z-10 mt-10 max-w-sm rounded-[28px] border border-app-border bg-app-surface p-6">
        <View className="mb-4 flex-row items-center gap-3">
          <View className="h-10 w-10 items-center justify-center rounded-2xl bg-app-primary-muted">
            <Text className="font-display text-lg font-semibold text-app-primary-strong">+</Text>
          </View>
          <Text className="font-display text-sm font-semibold uppercase tracking-[2px] text-app-primary-strong">
            {insightTitle}
          </Text>
        </View>
        <Text className="font-display text-lg leading-8 text-app-text">{insightBody}</Text>
      </View>

      <View className="relative z-10 mt-6 flex-row flex-wrap gap-3">
        {["Track cashflow", "Plan bills", "Grow together"].map((item) => (
          <View
            key={item}
            className="rounded-full border border-app-border bg-app-surface px-4 py-2">
            <Text className="font-display text-sm font-semibold uppercase tracking-[1.4px] text-app-soft">
              {item}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}
