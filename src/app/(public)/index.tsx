import { ScrollView, Text, View, useWindowDimensions } from "react-native";

import { ThemeToggle } from "@/components/common/ThemeToggle";
import { BrandMark } from "@/components/landing/BrandMark";
import { FeatureList } from "@/components/landing/FeatureList";
import { Footer } from "@/components/landing/Footer";
import { HeroActions } from "@/components/landing/HeroActions";
import { Showcase } from "@/components/landing/Showcase";

const features = [
  "Track your cashflow",
  "Plan your bills",
  "Split with anyone",
  "Build wealth together",
];

export default function Index() {
  const { height } = useWindowDimensions();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 bg-app-bg" style={{ minHeight: height }}>
        <View className="mx-auto w-full max-w-7xl flex-1 px-6 pb-10 pt-6 md:px-10 lg:px-16">
          <View className="mb-10 items-end">
            <ThemeToggle />
          </View>

          <View className="flex-1 justify-center">
            <View className="flex-col gap-14 lg:flex-row lg:items-center lg:gap-10">
              <View className="w-full lg:max-w-[470px]">
                <BrandMark />

                <Text className="mt-12 font-display text-6xl font-semibold leading-[1.05] tracking-tight text-app-text md:text-7xl">
                  Welcome to{"\n"}
                  <Text className="text-app-primary">Rupeez</Text>
                </Text>

                <Text className="mt-6 font-display text-2xl font-medium text-app-muted md:text-3xl">
                  Your Fin-OS. All-in-One.
                </Text>

                <View className="mt-10">
                  <FeatureList items={features} />
                </View>

                <View className="mt-10">
                  <HeroActions />
                </View>
              </View>

              <Showcase />
            </View>
          </View>
        </View>

        <Footer />
      </View>
    </ScrollView>
  );
}
