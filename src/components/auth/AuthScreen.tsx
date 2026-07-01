import type { PropsWithChildren } from "react";
import { ScrollView, View, useWindowDimensions } from "react-native";

import { ThemeToggle } from "@/components/common/ThemeToggle";

import { Footer } from "../landing/Footer";
import { AuthPromoPanel } from "./AuthPromoPanel";

type AuthScreenProps = PropsWithChildren<{
  body: string;
  insightBody: string;
  insightTitle: string;
  title: string;
}>;

export function AuthScreen({ body, children, insightBody, insightTitle, title }: AuthScreenProps) {
  const { height } = useWindowDimensions();

  return (
    <ScrollView className="flex-1 bg-app-bg" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 lg:flex-row" style={{ minHeight: height }}>
        <View className="border-b border-app-border lg:w-[48%] lg:border-b-0 lg:border-r hidden md:flex">
          <AuthPromoPanel
            body={body}
            insightBody={insightBody}
            insightTitle={insightTitle}
            title={title}
          />
        </View>

        <View className="flex-1 bg-app-bg px-6 py-6 md:px-10 lg:px-14 lg:py-10">
          <View className="items-end">
            <ThemeToggle />
          </View>
          <View className="mx-auto flex-1 w-full max-w-[520px] justify-center py-8 lg:py-12">
            {children}
          </View>
        </View>
      </View>
      <Footer />
    </ScrollView>
  );
}
