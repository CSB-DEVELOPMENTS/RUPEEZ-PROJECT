import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database.types";

/**
 * Refreshes the user's session cookie on every request.
 * Call this from the root middleware.ts.
 *
 * Also enforces auth-gating:
 *  - Unauthenticated users hitting a protected route are redirected to /login.
 *  - Authenticated users hitting /login or /signup are redirected to /.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Write cookies onto both the request and the response so that
          // downstream Server Components see the refreshed session.
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // IMPORTANT: Do not add any logic between createServerClient and
  // supabase.auth.getUser(). A subtle bug can cause session issues.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const fullPath = `${pathname}${request.nextUrl.search}`;

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup") || pathname.startsWith("/auth");

  // Redirect unauthenticated users to /login (except on auth routes)
  if (!user && !isAuthRoute) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("redirectTo", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  // Redirect authenticated users away from login/signup to home
  if (user && (pathname === "/login" || pathname === "/signup")) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/";
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}
