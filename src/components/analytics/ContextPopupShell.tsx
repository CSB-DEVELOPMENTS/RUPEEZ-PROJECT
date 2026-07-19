import type { PropsWithChildren } from "react";
import { Modal, Pressable, View } from "react-native";

type ContextPopupShellProps = PropsWithChildren<{
  maxWidthClassName?: string;
  onClose: () => void;
  visible: boolean;
}>;

export function ContextPopupShell({
  children,
  maxWidthClassName = "max-w-xl",
  onClose,
  visible,
}: ContextPopupShellProps) {
  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/65 px-5 py-8" onPress={onClose}>
        <View className="flex-1 justify-center">
          <Pressable
            className={`mx-auto max-h-full w-full overflow-hidden rounded-[24px] border border-app-border bg-app-surface shadow-showcase-soft dark:shadow-showcase-soft-dark ${maxWidthClassName}`}
            onPress={() => {}}>
            {children}
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
}
