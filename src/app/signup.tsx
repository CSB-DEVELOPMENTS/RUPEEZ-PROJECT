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

const signupHighlights = [
  "Set up your personal finance hub",
  "Track bills before they become stress",
  "Invite others into shared budgets later",
];

export default function SignupScreen() {
  const router = useRouter();
  const { signInWithEmail, loading } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [feedback, setFeedback] = useState<Feedback>(null);

  async function handleSignup() {
    if (!fullName.trim() || !email.trim() || !password) {
      setFeedback({ tone: "error", message: "Complete every field before creating your account." });
      return;
    }

    if (!agreeToTerms) {
      setFeedback({
        tone: "error",
        message: "You need to accept the Terms of Service and Privacy Policy to continue.",
      });
      return;
    }

    setFeedback(null);

    const { error } = await signInWithEmail(email, password);

    if (error) {
      setFeedback({ tone: "error", message: error.message });
      return;
    }

    setFeedback({
      tone: "success",
      message: "Account created. Check your inbox for the verification email from Supabase.",
    });

    router.replace("/login");
  }

  return (
    <AuthScreen
      body="Create your Rupeez workspace and start with a clearer, greener way to manage everyday money decisions."
      insightBody="People who define a simple planning ritual early usually find it easier to stay consistent as their finances grow."
      insightTitle="Starter Insight"
      title={"Build your first\nmoney system\nwith confidence."}>
      <View className="gap-8">
        {feedback ? <AuthMessage message={feedback.message} tone={feedback.tone} /> : null}

        <View className="gap-6 rounded-[32px] border border-app-border bg-app-surface p-6 md:p-8">
          <Text className="font-display text-5xl font-semibold tracking-tight text-app-text md:text-6xl">
            Sign Up
          </Text>
          <AuthInput
            autoCapitalize="words"
            autoComplete="name"
            label="Full Name"
            onChangeText={setFullName}
            placeholder="e.g. Alexander Pierce"
            value={fullName}
          />

          <AuthInput
            autoComplete="email"
            keyboardType="email-address"
            label="Work Email"
            onChangeText={setEmail}
            placeholder="alexander@company.com"
            value={email}
          />

          <AuthInput
            autoComplete="password"
            label="Create Password"
            onChangeText={setPassword}
            onTogglePress={() => setShowPassword((value) => !value)}
            placeholder="Set a strong password"
            secureTextEntry={!showPassword}
            toggleLabel={showPassword ? "Hide" : "Show"}
            value={password}
          />

          <Pressable
            className="flex-row items-start gap-4"
            onPress={() => setAgreeToTerms((value) => !value)}>
            <View
              className={
                agreeToTerms
                  ? "mt-1 h-6 w-6 rounded-lg border border-app-primary bg-app-primary"
                  : "mt-1 h-6 w-6 rounded-lg border border-app-border bg-app-panel"
              }
            />
            <Text className="flex-1 font-display text-lg leading-8 text-app-muted">
              I agree to the{" "}
              <Text className="font-semibold text-app-primary-strong">Terms of Service</Text> and{" "}
              <Text className="font-semibold text-app-primary-strong">Privacy Policy</Text>
            </Text>
          </Pressable>

          <AuthActionButton loading={loading} onPress={handleSignup}>
            Create Account
          </AuthActionButton>

          <AuthDivider label="Or continue with" />

          <AuthActionButton
            onPress={() =>
              setFeedback({
                tone: "info",
                message:
                  "Google OAuth needs a redirect configuration before it can be enabled in Expo.",
              })
            }
            variant="secondary">
            Continue with Google
          </AuthActionButton>
        </View>

        <View className="flex-row flex-wrap items-center justify-center gap-2">
          <Text className="font-display text-lg text-app-muted">Already have an account?</Text>
          <Link href="../login" asChild>
            <Pressable>
              <Text className="font-display text-lg font-semibold text-app-primary-strong">
                Log in
              </Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </AuthScreen>
  );
}
