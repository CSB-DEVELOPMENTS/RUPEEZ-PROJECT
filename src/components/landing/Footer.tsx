import { Text, View } from 'react-native';

const links = ['Privacy Policy', 'Terms of Service', 'Security', 'Status'];

export function Footer() {
  return (
    <View className="border-t border-app-border bg-app-surface/80 px-6 py-8 md:px-10 lg:px-16">
      <View className="mx-auto w-full max-w-7xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <View className="gap-2">
          <Text className="font-display text-2xl font-semibold tracking-tight text-app-text">Rupeez</Text>
          <Text className="font-display text-base text-app-muted">© 2024 Rupeez Financial OS. All rights reserved.</Text>
        </View>

        <View className="flex-row flex-wrap gap-x-8 gap-y-3">
          {links.map((link) => (
            <Text key={link} className="font-display text-base text-app-muted">
              {link}
            </Text>
          ))}
        </View>
      </View>
    </View>
  );
}
