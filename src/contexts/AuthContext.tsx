import { supabase } from "@/lib/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";

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
  signOut: () => Promise<{ error: AuthError | null }>;
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

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
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  }, []);

  const signUpWithEmail = useCallback(
    async (email: string, password: string, fullName?: string) => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName ?? "",
          },
          emailRedirectTo: getRedirectUrl(),
        },
      });
      return { error };
    },
    [],
  );

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
        signOut,
        resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
