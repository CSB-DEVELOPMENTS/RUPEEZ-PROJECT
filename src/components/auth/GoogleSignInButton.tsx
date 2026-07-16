import { useRouter } from "expo-router";
import { useState } from "react";
import { Platform } from "react-native";

import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

import { AuthActionButton } from "@/components/auth/AuthActionButton";
import { useAuth } from "@/hooks/auth/useAuth";

interface GoogleSignInButtonProps {
  onError?: (message: string) => void;
}

// ─── Native implementation ────────────────────────────────────────────────────
function GoogleSignInButtonNative({ onError }: GoogleSignInButtonProps) {
  const { signInWithGoogle } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);
    const { error } = await signInWithGoogle();
    setLoading(false);

    if (error) {
      if (error !== "Sign-in cancelled.") {
        onError?.(error);
      }
      return;
    }

    router.replace("/dashboard");
  }

  return (
    <GoogleSigninButton
      color={GoogleSigninButton.Color.Dark}
      onPress={handlePress}
      size={GoogleSigninButton.Size.Wide}
      style={{ width: "100%", height: 56 }}
      disabled={loading}
    />
  );
}

// ─── Web implementation ───────────────────────────────────────────────────────
function GoogleSignInButtonWeb({ onError }: GoogleSignInButtonProps) {
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);

  async function handlePress() {
    setLoading(true);
    const { error } = await signInWithGoogle();
    setLoading(false);

    if (error) {
      onError?.(error);
    }
    // On web, Supabase's signInWithOAuth triggers a full-page redirect,
    // so no manual navigation is needed after a successful call.
  }

  return (
    <AuthActionButton loading={loading} onPress={handlePress} variant="secondary">
      Continue with Google
    </AuthActionButton>
  );
}

// ─── Unified export ───────────────────────────────────────────────────────────
export function GoogleSignInButton(props: GoogleSignInButtonProps) {
  if (Platform.OS === "web") {
    return <GoogleSignInButtonWeb {...props} />;
  }
  return <GoogleSignInButtonNative {...props} />;
}
