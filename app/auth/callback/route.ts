import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Auth callback route handler.
 *
 * Handles:
 *  1. Email confirmation links  (token_hash + type=email)
 *  2. OAuth redirects           (code param — PKCE flow)
 *     - Google OAuth
 *
 * Supabase redirects the user here after authentication.
 * This route exchanges the one-time code/token for a session,
 * then redirects to the intended destination (or home).
 *
 * Configure this URL in:
 *  - Supabase Dashboard → Auth → URL Configuration → Redirect URLs
 *  - GCP Console → OAuth 2.0 Credentials → Authorized redirect URIs (when ready)
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);

  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as "email" | "recovery" | "invite" | null;

  // Where to go after successful auth — defaults to home
  const next = searchParams.get("next") ?? "/";
  const redirectTo = searchParams.get("redirectTo") ?? next;

  const supabase = await createClient();

  // --- PKCE OAuth / magic-link code exchange ---
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] exchangeCodeForSession error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }

    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // --- Email confirmation / password recovery token ---
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ token_hash, type });

    if (error) {
      console.error("[auth/callback] verifyOtp error:", error.message);
      return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`);
    }

    return NextResponse.redirect(`${origin}${redirectTo}`);
  }

  // No valid params — redirect to login with a generic error
  return NextResponse.redirect(`${origin}/login?error=missing_auth_params`);
}
