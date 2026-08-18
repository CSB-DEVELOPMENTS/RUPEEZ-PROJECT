import { DASHBOARD_WEEK_DAYS } from "@/constants/dashboard";
import { DashboardCalendarDay } from "@/types/dashboard";
import { useState } from "react";
import { Modal, Platform, Pressable, Text, View } from "react-native";
import { DashboardCard } from "./DashboardCard";
import { calendarToneClass, formatCalendarDate } from "./DashboardSections";
import SectionHeader from "./SectionHeader";

export function DashboardCalendarCard({
  items,
  monthLabel,
}: {
  items: DashboardCalendarDay[];
  monthLabel: string;
}) {
  const [selectedDay, setSelectedDay] = useState<DashboardCalendarDay | null>(null);
  const showMobilePopup = Platform.OS !== "web" && selectedDay !== null;

  return (
    <>
      <DashboardCard className="relative overflow-visible">
        <SectionHeader
          title="Calendar Heatmap"
          action={monthLabel}
          actionHref="/calendar-heatmap"
        />

        <View className="mb-5 flex-row justify-between px-1">
          {DASHBOARD_WEEK_DAYS.map((day, index) => (
            <Text key={index} className="w-10 text-center font-display text-sm text-app-soft">
              {day}
            </Text>
          ))}
        </View>

        <View className="flex-row flex-wrap gap-y-3">
          {items.map((day) => {
            const dayStyles = calendarToneClass(day);
            const isSelected = selectedDay?.date === day.date;
            const popupText =
              day.totalLabel ?? (day.activityCount === 0 ? "No activities recorded" : undefined);

            return (
              <View
                key={day.date}
                className={`items-center ${isSelected ? "z-10" : ""}`}
                style={{ width: "14.2857%" }}>
                <Pressable
                  className={`h-9 w-9 items-center justify-center rounded-2xl border sm:h-10 sm:w-10 ${dayStyles.bg} ${
                    isSelected ? "border-app-primary" : ""
                  }`}
                  disabled={!day.isCurrentMonth}
                  onHoverIn={Platform.OS === "web" ? () => setSelectedDay(day) : undefined}
                  onHoverOut={Platform.OS === "web" ? () => setSelectedDay(null) : undefined}
                  onPress={Platform.OS === "web" ? undefined : () => setSelectedDay(day)}>
                  <Text className={`font-display text-base md:text-lg ${dayStyles.text}`}>
                    {day.dayLabel}
                  </Text>
                </Pressable>

                {Platform.OS === "web" && isSelected ?
                  <View className="pointer-events-none absolute left-1/2 top-full z-20 mt-3 w-52 -translate-x-1/2 rounded-[20px] border border-app-border bg-app-surface px-4 py-3 shadow-showcase-soft">
                    <Text className="font-display text-sm font-semibold text-app-text">
                      {formatCalendarDate(day.date)}
                    </Text>
                    <Text className="mt-1 font-display text-xs text-app-muted">{popupText}</Text>
                    {day.activities.length > 0 ?
                      <View className="mt-3 gap-2">
                        {day.activities.slice(0, 3).map((activity) => (
                          <View key={activity.id} className="gap-1">
                            <Text className="font-display text-sm font-semibold text-app-text">
                              {activity.title}
                            </Text>
                            <Text className="font-display text-xs text-app-muted">
                              {[
                                activity.category,
                                activity.time,
                                `LKR ${activity.amount.toFixed(2)}`,
                              ]
                                .filter(Boolean)
                                .join(" - ")}
                            </Text>
                          </View>
                        ))}
                      </View>
                    : null}
                  </View>
                : null}
              </View>
            );
          })}
        </View>
      </DashboardCard>

      <Modal
        animationType="fade"
        transparent
        visible={showMobilePopup}
        onRequestClose={() => setSelectedDay(null)}>
        <Pressable className="flex-1 bg-black/40 px-5 py-10" onPress={() => setSelectedDay(null)}>
          <View className="flex-1 justify-center">
            <Pressable
              className="rounded-[28px] border border-app-border bg-app-surface p-5 shadow-showcase-soft"
              onPress={() => {}}>
              {selectedDay ?
                <View className="gap-4">
                  <View className="flex-row items-start justify-between gap-4">
                    <View className="flex-1 gap-1">
                      <Text className="font-display text-lg font-semibold text-app-text">
                        {formatCalendarDate(selectedDay.date)}
                      </Text>
                      <Text className="font-display text-sm text-app-muted">
                        {selectedDay.totalLabel ?? "No activities recorded for this day"}
                      </Text>
                    </View>
                    <Pressable onPress={() => setSelectedDay(null)}>
                      <Text className="font-display text-sm font-semibold text-app-primary">
                        Close
                      </Text>
                    </Pressable>
                  </View>

                  {selectedDay.activities.length > 0 ?
                    <View className="gap-3">
                      {selectedDay.activities.map((activity) => (
                        <View
                          key={activity.id}
                          className="rounded-[20px] border border-app-border bg-app-panel/35 px-4 py-3">
                          <Text className="font-display text-base font-semibold text-app-text">
                            {activity.title}
                          </Text>
                          <Text className="mt-1 font-display text-sm text-app-muted">
                            {[activity.category, activity.time, activity.amount]
                              .filter(Boolean)
                              .join(" - ")}
                          </Text>
                        </View>
                      ))}
                    </View>
                  : null}
                </View>
              : null}
            </Pressable>
          </View>
        </Pressable>
      </Modal>
    </>
  );
}
