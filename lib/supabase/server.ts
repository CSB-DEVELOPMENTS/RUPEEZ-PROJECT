import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

/**
 * Server-side Supabase client.
 * Use this in Server Components, Server Actions, and Route Handlers.
 * Reads/writes cookies via next/headers — must be called inside a
 * request context (cannot be used at module level).
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component — cookies can only be
            // mutated inside middleware or Route Handlers. Safe to ignore here
            // as the middleware will refresh the session.
          }
        },
      },
    }
  );
}
