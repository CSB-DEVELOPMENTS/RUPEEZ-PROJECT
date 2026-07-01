import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import { AuthActionButton } from "@/components/auth/AuthActionButton";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { useAuth } from "@/hooks/auth/useAuth";

type Feedback = { message: string; tone: "error" | "info" | "success" } | null;

export default function LoginScreen() {
  const router = useRouter();
  const { signInWithEmail } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    if (!email.trim() || !password) {
      setFeedback({ tone: "error", message: "Enter your email and password to continue." });
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    const { error } = await signInWithEmail(email, password);

    if (error) {
      setFeedback({ tone: "error", message: error.message });
      return;
    }

    setSubmitting(false);
    setFeedback({ tone: "success", message: "Login successful. Redirecting you now." });
    router.replace("/dashboard");
  }

  return (
    <AuthScreen
      body="Pick up right where you left off with a clean view of your cashflow, bills, and shared financial goals."
      insightBody="Returning weekly to review trends and upcoming commitments usually leads to calmer, more consistent money decisions."
      insightTitle="Weekly Insight"
      title={"Welcome back to\nyour money flow."}>
      <View className="gap-8">
        {feedback ? <AuthMessage message={feedback.message} tone={feedback.tone} /> : null}

        <View className="gap-6 rounded-[32px] border border-app-border bg-app-surface p-6 md:p-8">
          <Text className="font-display text-5xl font-semibold tracking-tight text-app-text md:text-6xl">
            Log In
          </Text>
          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            label="Email Address"
            onChangeText={setEmail}
            placeholder="name@example.com"
            value={email}
          />

          <AuthInput
            autoComplete="password"
            label="Password"
            onChangeText={setPassword}
            onTogglePress={() =>
              setFeedback({
                tone: "info",
                message:
                  "Password recovery can be wired once the recovery redirect route is configured in Supabase.",
              })
            }
            placeholder="Enter your password"
            secureTextEntry
            toggleLabel="Forgot Password?"
            value={password}
          />
          <AuthActionButton loading={submitting} onPress={handleLogin}>
            Login
          </AuthActionButton>

          <AuthDivider label="Or continue with" />

          <AuthActionButton
            onPress={() =>
              setFeedback({
                tone: "info",
                message: "Google sign-in is not yet wired up. Please use email/password for now.",
              })
            }
            variant="secondary">
            Continue with Google
          </AuthActionButton>
        </View>

        <View className="items-center gap-8 pt-2">
          <View className="flex-row flex-wrap items-center justify-center gap-2">
            <Text className="font-display text-lg text-app-muted">{"Don't have an account?"}</Text>
            <Link href="/signup" asChild>
              <Pressable>
                <Text className="font-display text-lg font-semibold text-app-primary-strong">
                  Start investing
                </Text>
              </Pressable>
            </Link>
          </View>
        </View>
      </View>
    </AuthScreen>
  );
}
