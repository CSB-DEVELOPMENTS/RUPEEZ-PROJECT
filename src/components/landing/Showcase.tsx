import { Text, View } from "react-native";

export function Showcase() {
  return (
    <View className="w-full flex-1 items-center justify-center">
      <View className="relative w-full max-w-[680px] px-4 py-10">
        <View className="absolute inset-y-6 left-6 right-6 rounded-[40px] bg-app-bg-accent opacity-80" />

        <View className="absolute left-0 top-0 rounded-[28px] border border-app-border bg-app-surface px-5 py-4 z-10 shadow-showcase-soft dark:shadow-showcase-soft-dark">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.5px] text-app-primary-strong">
            REAL-TIME SYNC
          </Text>
          <Text className="mt-2 font-display text-lg text-app-text">99.9% Uptime</Text>
        </View>

        <View className="absolute bottom-2 right-0 rounded-[28px] border border-app-border bg-app-surface px-5 py-4 z-10 shadow-showcase-soft dark:shadow-showcase-soft-dark">
          <Text className="font-display text-sm font-semibold uppercase tracking-[1.5px] text-app-primary-strong">
            CASHFLOW ACTIVE
          </Text>
          <Text className="mt-2 font-display text-lg text-app-text">+$4,230.00</Text>
        </View>

        <View className="overflow-hidden rounded-[36px] border border-app-border bg-app-surface p-5 shadow-showcase-strong">
          <View className="rounded-[28px] border border-app-border bg-app-panel p-4">
            <View className="rounded-[22px] bg-app-panel-strong p-4">
              <View className="mb-4 flex-row items-center justify-between">
                <View>
                  <Text className="font-display text-sm text-app-text-muted">Portfolio</Text>
                  <Text className="mt-1 font-display text-2xl font-semibold text-app-text">
                    $3,361.20
                  </Text>
                </View>
                <View className="rounded-full bg-app-primary-muted px-3 py-1">
                  <Text className="font-display text-xs font-medium text-app-primary-strong">
                    +18.2%
                  </Text>
                </View>
              </View>

              <View className="h-40 rounded-[22px] border border-app-border/20 bg-app-primary-muted px-4 py-5">
                <View className="mb-6 flex-row items-end justify-between gap-2">
                  <View className="h-8 flex-1 rounded-full bg-app-primary/35" />
                  <View className="h-12 flex-1 rounded-full bg-app-primary/40" />
                  <View className="h-10 flex-1 rounded-full bg-app-primary/55" />
                  <View className="h-14 flex-1 rounded-full bg-app-primary/60" />
                  <View className="h-20 flex-1 rounded-full bg-app-primary/80" />
                  <View className="h-16 flex-1 rounded-full bg-app-primary/65" />
                </View>
                <View className="flex-row justify-between">
                  <View className="h-1.5 w-10 rounded-full bg-app-border" />
                  <View className="h-1.5 w-10 rounded-full bg-app-border" />
                  <View className="h-1.5 w-10 rounded-full bg-app-border" />
                  <View className="h-1.5 w-10 rounded-full bg-app-border" />
                </View>
              </View>

              <View className="mt-4 flex-row gap-3">
                <View className="flex-1 rounded-[18px] border border-app-border bg-app-panel p-3">
                  <Text className="font-display text-xs text-app-text-muted">Bills</Text>
                  <Text className="mt-2 font-display text-lg font-semibold text-app-text">
                    $130
                  </Text>
                  <View className="mt-3 h-2 rounded-full bg-app-border">
                    <View className="h-2 w-2/3 rounded-full bg-app-primary" />
                  </View>
                </View>
                <View className="flex-1 rounded-[18px] border border-app-border bg-app-panel p-3">
                  <Text className="font-display text-xs text-app-text-muted">Split Expenses</Text>
                  <Text className="mt-2 font-display text-lg font-semibold text-app-text">
                    4 active
                  </Text>
                  <View className="mt-3 flex-row gap-2">
                    <View className="h-8 w-8 rounded-full bg-app-primary/80" />
                    <View className="h-8 w-8 rounded-full bg-app-brand/70" />
                    <View className="h-8 w-8 rounded-full bg-app-text-muted/20" />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="pointer-events-none absolute bottom-5 left-1/2 w-[38%] -translate-x-1/2 rounded-[24px] border border-app-border/40 bg-app-panel p-3 shadow-showcase-phone">
            <View className="h-1 w-16 self-center rounded-full bg-app-text-muted/20" />
            <View className="mt-3 rounded-[18px] bg-app-surface p-3">
              <Text className="font-display text-xs text-app-text-muted">Mobile Snapshot</Text>
              <View className="mt-3 h-16 rounded-[16px] bg-app-primary-muted px-3 py-2">
                <View className="mb-3 flex-row items-end gap-1">
                  <View className="h-4 flex-1 rounded-full bg-app-primary/40" />
                  <View className="h-6 flex-1 rounded-full bg-app-primary/60" />
                  <View className="h-5 flex-1 rounded-full bg-app-primary/50" />
                  <View className="h-8 flex-1 rounded-full bg-app-primary/80" />
                </View>
                <View className="h-1.5 w-14 rounded-full bg-app-text-muted/20" />
              </View>
              <View className="mt-3 flex-row gap-2">
                <View className="h-10 flex-1 rounded-[12px] bg-app-panel-strong" />
                <View className="h-10 flex-1 rounded-[12px] bg-app-panel-strong" />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
