const UNSAFE_ERROR_MESSAGES = [
  /failed to fetch/i,
  /network request failed/i,
  /network error/i,
  /unexpected token/i,
];

/** Returns a concise message that is suitable for customer-facing feedback. */
export function getErrorMessage(error: unknown, fallback: string): string {
  const message =
    error instanceof Error ? error.message :
    typeof error === "object" && error !== null && "message" in error && typeof error.message === "string" ?
      error.message
    : "";
  const normalized = message.trim();

  if (!normalized || normalized.length > 180 || UNSAFE_ERROR_MESSAGES.some((pattern) => pattern.test(normalized))) {
    return fallback;
  }

  return normalized;
}
