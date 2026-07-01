import { Redirect, Slot, usePathname } from "expo-router";

import { AuthGateFallback } from "@/components/auth/AuthGateFallback";
import { useAuth } from "@/hooks/auth/useAuth";

const authOnlyPublicRoutes = new Set(["/login", "/signup", "/"]);

export default function PublicLayout() {
  const pathname = usePathname();
  const { loading, user } = useAuth();

  if (loading) {
    return <AuthGateFallback />;
  }

  if (user && authOnlyPublicRoutes.has(pathname)) {
    return <Redirect href="/dashboard" />;
  }

  return <Slot />;
}
