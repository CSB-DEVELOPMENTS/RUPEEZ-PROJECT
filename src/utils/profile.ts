import type { Tables } from "../../database.types";

export type ProfileType = "personal" | "business" | "student" | "custom";

export function profileTypeLabel(type?: string | null) {
  if (!type) return "Personal";
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function profileLabel(profile: Pick<Tables<"profiles">, "profile_name" | "profile_type">) {
  return `${profile.profile_name?.trim() || "Untitled Profile"} - ${profileTypeLabel(profile.profile_type)}`;
}

export function profileIcon(type?: string | null) {
  switch (type) {
    case "business": return "briefcase-outline" as const;
    case "student": return "school-outline" as const;
    case "custom": return "tune-variant" as const;
    default: return "account-circle-outline" as const;
  }
}
