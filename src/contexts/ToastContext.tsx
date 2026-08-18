import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { Modal, Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Colors } from "@/constants/theme";
import { useAppTheme } from "@/hooks/theme/useAppTheme";

export type ToastType = "success" | "error" | "info";

export type ToastOptions = { type: ToastType; title: string; message?: string };

export type ToastContextValue = {
  show: (toast: ToastOptions) => void;
  success: (title: string, message?: string) => void;
  error: (title: string, message?: string) => void;
  info: (title: string, message?: string) => void;
};

export const ToastContext = createContext<ToastContextValue | undefined>(undefined);

const TOAST_DURATION = 5000;

const toastIcons: Record<ToastType, React.ComponentProps<typeof MaterialCommunityIcons>["name"]> = {
  success: "check-circle-outline",
  error: "alert-circle-outline",
  info: "information-outline",
};

export function ToastProvider({ children }: PropsWithChildren) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const colors = Colors[theme];
  const [toast, setToast] = useState<ToastOptions | null>(null);
  const dismissTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => {
    if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
    dismissTimeout.current = null;
    setToast(null);
  }, []);

  const show = useCallback(
    (nextToast: ToastOptions) => {
      if (dismissTimeout.current) clearTimeout(dismissTimeout.current);
      setToast(nextToast);
      dismissTimeout.current = setTimeout(dismiss, TOAST_DURATION);
    },
    [dismiss],
  );

  useEffect(() => dismiss, [dismiss]);

  const value = useMemo<ToastContextValue>(
    () => ({
      show,
      success: (title, message) => show({ type: "success", title, message }),
      error: (title, message) => show({ type: "error", title, message }),
      info: (title, message) => show({ type: "info", title, message }),
    }),
    [show],
  );

  const iconColor =
    toast?.type === "error" ? colors.danger
    : toast?.type === "info" ? colors.brand
    : colors.primaryStrong;

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast ?
        <Modal
          animationType="none"
          onRequestClose={dismiss}
          statusBarTranslucent
          transparent
          visible>
          <View pointerEvents="box-none" style={[styles.viewport, { paddingTop: insets.top + 12 }]}>
            <View
              accessibilityLabel={[toast.title, toast.message].filter(Boolean).join(". ")}
              accessibilityRole="alert"
              style={[
                styles.toast,
                {
                  backgroundColor: colors.surface,
                  borderColor: toast.type === "error" ? colors.danger : colors.border,
                  maxWidth: Math.min(440, width - 32),
                },
              ]}>
              <MaterialCommunityIcons color={iconColor} name={toastIcons[toast.type]} size={24} />
              <View style={styles.copy}>
                <Text style={[styles.title, { color: colors.text }]}>{toast.title}</Text>
                {toast.message ?
                  <Text style={[styles.message, { color: colors.textMuted }]}>{toast.message}</Text>
                : null}
              </View>
              <Pressable
                accessibilityLabel="Dismiss notification"
                accessibilityRole="button"
                hitSlop={8}
                onPress={dismiss}
                style={styles.dismiss}>
                <MaterialCommunityIcons color={colors.textMuted} name="close" size={20} />
              </Pressable>
            </View>
          </View>
        </Modal>
      : null}
    </ToastContext.Provider>
  );
}

const styles = StyleSheet.create({
  viewport: {
    alignItems: "center",
    elevation: 1000,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1000,
  },
  toast: {
    alignItems: "flex-start",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.18,
    shadowRadius: 16,
  },
  copy: { flex: 1, gap: 4 },
  title: { fontSize: 16, fontWeight: "700" },
  message: { fontSize: 14, lineHeight: 20 },
  dismiss: { marginTop: 1 },
});
