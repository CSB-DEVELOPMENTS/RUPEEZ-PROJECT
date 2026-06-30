import { useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

export function HeroActions() {
  const router = useRouter();

  return (
    <View className="flex-col gap-4 sm:flex-row">
      <Pressable
        className="min-h-14 items-center justify-center rounded-2xl bg-app-primary px-8 py-4"
        onPress={() => router.push('./signup')}>
        <Text className="font-display text-lg font-medium text-app-primary-contrast">Try Demo Mode -&gt;</Text>
      </Pressable>
      <Pressable
        className="min-h-14 items-center justify-center rounded-2xl border border-app-border bg-app-surface px-8 py-4"
        onPress={() => router.push('./login')}>
        <Text className="font-display text-lg font-medium text-app-text">Login / Sign Up</Text>
      </Pressable>
    </View>
  );
}
