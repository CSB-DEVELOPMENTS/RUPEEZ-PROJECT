import { supabase } from "@/lib/supabase";
import { AuthError, Session, User } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { Tables, TablesInsert } from "../../database.types";

type Profile = Tables<"profiles">;
type ProfileInsert = TablesInsert<"profiles">;

export interface AuthContextValue {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  profiles: Profile[];
  loading: boolean;
  profileLoading: boolean;
  createProfile: (
    input: Pick<ProfileInsert, "profile_name">
      & Partial<Pick<ProfileInsert, "base_currency" | "profile_type" | "primary_color">>,
  ) => Promise<{ data: Profile | null; error: Error | null }>;
  setActiveProfile: (profileId: string) => void;
  refreshProfiles: () => Promise<void>;
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
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  const fetchProfiles = useCallback(async (currentUser: User | null) => {
    if (!currentUser) {
      setProfile(null);
      setProfiles([]);
      setProfileLoading(false);
      return;
    }

    setProfileLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Failed to fetch profiles", error);
      setProfile(null);
      setProfiles([]);
    } else {
      const nextProfiles = data ?? [];
      setProfiles(nextProfiles);
      setProfile(nextProfiles[0] ?? null);
    }

    setProfileLoading(false);
  }, []);

  const refreshProfiles = useCallback(async () => {
    await fetchProfiles(user);
  }, [fetchProfiles, user]);

  const createProfile = useCallback(
    async ({
      base_currency = "LKR",
      profile_name,
      profile_type = "personal",
      primary_color = "#22C55E",
    }: Pick<ProfileInsert, "profile_name">
      & Partial<Pick<ProfileInsert, "base_currency" | "profile_type" | "primary_color">>) => {
      if (!user) {
        return { data: null, error: new Error("You must be signed in to create a profile.") };
      }

      const { data, error } = await supabase
        .from("profiles")
        .insert({ base_currency, profile_name, profile_type, primary_color, user_id: user.id })
        .select("*")
        .single();

      if (!error && data) {
        setProfiles((currentProfiles) => [...currentProfiles, data]);
        setProfile((currentProfile) => currentProfile ?? data);
      }

      return { data, error };
    },
    [user],
  );

  const setActiveProfile = useCallback(
    (profileId: string) => {
      setProfile(
        (currentProfile) =>
          profiles.find((item) => item.profile_id === profileId) ?? currentProfile,
      );
    },
    [profiles],
  );

  const handleAuthStateChange = useCallback(
    (currentSession: Session | null) => {
      const currentUser = currentSession?.user ?? null;
      setSession(currentSession);
      setUser(currentUser);
      setLoading(false);
      void fetchProfiles(currentUser);
    },
    [fetchProfiles],
  );

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
        profile,
        profiles,
        loading,
        profileLoading,
        createProfile,
        setActiveProfile,
        refreshProfiles,
        signInWithEmail,
        signUpWithEmail,
        signOut,
        resetPassword,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
