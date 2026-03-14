"use client";

/**
 * useAuth — convenience hook for accessing auth state and actions.
 *
 * Re-exports everything from AuthContext so components only need one import:
 *
 *   import { useAuth } from '@/hooks/auth/useAuth'
 *
 * Must be used inside a component wrapped by <AuthProvider>.
 */
export { useAuthContext as useAuth } from "@/contexts/AuthContext";
