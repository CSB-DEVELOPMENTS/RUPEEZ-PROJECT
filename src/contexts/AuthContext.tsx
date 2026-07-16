import { supabase } from "@/lib/supabase";
import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AuthError, Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import { Platform } from "react-native";

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  //   profile: PublicUser | null;
  loading: boolean;
  // profileLoading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signUpWithEmail: (
    email: string,
    password: string,
    fullName?: string,
  ) => Promise<{ error: AuthError | null }>;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const GOOGLE_DEVELOPER_ERROR_CODE = "10";
const SUPABASE_INVALID_API_KEY_MESSAGE = "Invalid API key";

const getRedirectUrl = (path: string = "") => {
  return Linking.createURL(`auth/callback${path}`);
};

export function AuthProvider({ children }: { children: ReactNode }) {
  // Add profile and profileLoading state if you want to fetch the user's profile from your database
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleAuthStateChange = useCallback((currentSession: Session | null) => {
    setSession(currentSession);
    setUser(currentSession?.user ?? null);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      handleAuthStateChange(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthStateChange(session);
    });

    return () => subscription.unsubscribe();
  }, [handleAuthStateChange]);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName ?? "" }, emailRedirectTo: getRedirectUrl() },
      });
      return { error };
    },
    [],
  );

  /**
   * Google Sign-In
   * - Web:    uses OAuth redirect via supabase.auth.signInWithOAuth
   * - Native: uses @react-native-google-signin to get an ID token,
   *           then exchanges it via supabase.auth.signInWithIdToken
   */
  const signInWithGoogle = useCallback(async (): Promise<{ error: string | null }> => {
    if (Platform.OS === "web") {
      // ── Web OAuth redirect ──────────────────────────────────────────
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: window.location.origin },
      });
      if (error) return { error: error.message };
      return { error: null };
    }

    // ── Native (Android / iOS) ────────────────────────────────────────
    const googleWebClientId = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID?.trim();

    if (!googleWebClientId) {
      return {
        error:
          "Google sign-in is not configured. Add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID to your .env.local file.",
      };
    }

    try {
      GoogleSignin.configure({ webClientId: googleWebClientId });

      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();

      if (!isSuccessResponse(response)) {
        return { error: "Google sign-in was cancelled or did not return a response." };
      }

      const idToken = response.data?.idToken;
      if (!idToken) {
        return { error: "Google sign-in did not return an ID token." };
      }

      const { error } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
      });

      if (error) {
        if (error.message?.includes(SUPABASE_INVALID_API_KEY_MESSAGE)) {
          return {
            error:
              "Supabase rejected the API key. Check EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY in .env.local, then fully restart Expo and rebuild the app.",
          };
        }
        return { error: error.message };
      }
      return { error: null };
    } catch (e: any) {
      if (isErrorWithCode(e)) {
        if (e.code === statusCodes.SIGN_IN_CANCELLED) {
          return { error: "Sign-in cancelled." };
        } else if (e.code === statusCodes.IN_PROGRESS) {
          return { error: "Sign-in already in progress." };
        } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          return { error: "Google Play Services are not available or outdated." };
        } else if (
          `${e.code}` === GOOGLE_DEVELOPER_ERROR_CODE
          || e.message?.includes("DEVELOPER_ERROR")
        ) {
          return {
            error:
              "Google Sign-In is misconfigured for this mobile build. Use your Google Web Client ID in EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID and register this build's Android SHA fingerprint for com.csbd.rupeez in Google Cloud or Firebase.",
          };
        }
      }
      return { error: `An unexpected error occurred during Google sign-in. ${e.message}` };
    }
  }, []);

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  }, []);

  const resetPassword = useCallback(async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getRedirectUrl("?next=/reset-password"),
    });
    return { error };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        // profile,
        loading,
        // profileLoading,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut,
        resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
