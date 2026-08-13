import { ToastContext, type ToastContextValue } from "@/contexts/ToastContext";
import { useContext } from "react";

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a <ToastProvider>");
  }
  return context;
}
