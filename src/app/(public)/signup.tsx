import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, Text, View } from "react-native";
import { z } from "zod";

import { AuthActionButton } from "@/components/auth/AuthActionButton";
import { AuthDivider } from "@/components/auth/AuthDivider";
import { AuthInput } from "@/components/auth/AuthInput";
import { AuthMessage } from "@/components/auth/AuthMessage";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { useAuth } from "@/hooks/auth/useAuth";

const signupSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters."),
  email: z.string().trim().email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Must contain at least one number.")
    .regex(/[^A-Za-z0-9]/, "Must contain at least one special character."),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupScreen() {
  const router = useRouter();
  const { signUpWithEmail } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<SignupFormValues>({
    defaultValues: { fullName: "", email: "", password: "" },
    mode: "onBlur",
    resolver: zodResolver(signupSchema),
  });

  async function onSubmit(values: SignupFormValues) {
    if (!agreeToTerms) {
      setTermsError(true);
      return;
    }

    setTermsError(false);
    setServerError(null);
    setSuccessMessage(null);

    const { error } = await signUpWithEmail(values.email, values.password, values.fullName.trim());

    if (error) {
      setServerError(error.message);
      return;
    }

    setSuccessMessage("Account created. Check your inbox for the verification email.");
    router.replace("/login");
  }

  return (
    <AuthScreen
      body="Create your Rupeez workspace and start with a clearer, greener way to manage everyday money decisions."
      insightBody="People who define a simple planning ritual early usually find it easier to stay consistent as their finances grow."
      insightTitle="Starter Insight"
      title={"Build your first\nmoney system\nwith confidence."}>
      <View className="gap-8">
        {serverError ? <AuthMessage message={serverError} tone="error" /> : null}
        {successMessage ? <AuthMessage message={successMessage} tone="success" /> : null}

        <View className="gap-6 rounded-[32px] border border-app-border bg-app-surface p-6 md:p-8">
          <Text className="font-display text-5xl font-semibold tracking-tight text-app-text md:text-6xl">
            Sign Up
          </Text>

          <Controller
            control={control}
            name="fullName"
            render={({ field: { onBlur, onChange, value } }) => (
              <AuthInput
                autoCapitalize="words"
                autoComplete="name"
                error={errors.fullName?.message}
                label="Full Name"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="e.g. Alexander Pierce"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onBlur, onChange, value } }) => (
              <AuthInput
                autoComplete="email"
                error={errors.email?.message}
                keyboardType="email-address"
                label="Work Email"
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="alexander@company.com"
                value={value}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onBlur, onChange, value } }) => (
              <AuthInput
                autoComplete="password"
                error={errors.password?.message}
                label="Create Password"
                onBlur={onBlur}
                onChangeText={onChange}
                onTogglePress={() => setShowPassword((v) => !v)}
                placeholder="Set a strong password"
                secureTextEntry={!showPassword}
                toggleLabel={showPassword ? "Hide" : "Show"}
                value={value}
              />
            )}
          />

          <View className="gap-2">
            <Pressable
              className="flex-row items-start gap-4"
              onPress={() => {
                setAgreeToTerms((v) => !v);
                setTermsError(false);
              }}>
              <View
                className={
                  agreeToTerms
                    ? "mt-1 h-6 w-6 rounded-lg border border-app-primary bg-app-primary"
                    : `mt-1 h-6 w-6 rounded-lg border bg-app-panel ${termsError ? "border-app-danger" : "border-app-border"}`
                }
              />
              <Text className="flex-1 font-display text-lg leading-8 text-app-muted">
                I agree to the{" "}
                <Text className="font-semibold text-app-primary-strong">Terms of Service</Text> and{" "}
                <Text className="font-semibold text-app-primary-strong">Privacy Policy</Text>
              </Text>
            </Pressable>
            {termsError ? (
              <Text className="pl-10 font-display text-sm leading-5 text-app-danger">
                You must accept the Terms of Service and Privacy Policy to continue.
              </Text>
            ) : null}
          </View>

          <AuthActionButton
            disabled={isSubmitting}
            loading={isSubmitting}
            onPress={handleSubmit(onSubmit)}>
            {isSubmitting ? "Creating Account…" : "Create Account"}
          </AuthActionButton>

          <AuthDivider label="Or continue with" />

          <AuthActionButton
            onPress={() =>
              setServerError(
                "Google OAuth needs a redirect configuration before it can be enabled in Expo.",
              )
            }
            variant="secondary">
            Continue with Google
          </AuthActionButton>
        </View>

        <View className="flex-row flex-wrap items-center justify-center gap-2">
          <Text className="font-display text-lg text-app-muted">Already have an account?</Text>
          <Link href="/login" asChild>
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
