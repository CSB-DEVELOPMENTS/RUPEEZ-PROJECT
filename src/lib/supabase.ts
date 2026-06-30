import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { Platform } from "react-native";

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabaseConfigError =
  !supabaseUrl || !supabasePublishableKey
    ? "Missing EXPO_PUBLIC_SUPABASE_URL or EXPO_PUBLIC_SUPABASE_ANON_KEY."
    : null;

const isBrowser = typeof window !== "undefined";

const storage =
  Platform.OS === "web"
    ? isBrowser
      ? {
          getItem: (key: string) => Promise.resolve(window.localStorage.getItem(key)),
          setItem: (key: string, value: string) => {
            window.localStorage.setItem(key, value);
            return Promise.resolve();
          },
          removeItem: (key: string) => {
            window.localStorage.removeItem(key);
            return Promise.resolve();
          },
        }
      : undefined
    : AsyncStorage;

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage,
    autoRefreshToken: isBrowser,
    persistSession: isBrowser,
    detectSessionInUrl: false,
  },
});
