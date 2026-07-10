import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Pressable, Text, View } from "react-native";

type TablePaginationProps = {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

function pageWindow(currentPage: number, totalPages: number) {
  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 2) {
    return [1, 2, 3];
  }

  if (currentPage >= totalPages - 1) {
    return [totalPages - 2, totalPages - 1, totalPages];
  }

  return [currentPage - 1, currentPage, currentPage + 1];
}

export function TablePagination({
  currentPage,
  pageSize,
  totalItems,
  totalPages,
}: TablePaginationProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);
  const pages = pageWindow(currentPage, totalPages);

  return (
    <View className="gap-4 border-t border-app-border px-5 py-5 md:flex-row md:items-center md:justify-between md:px-6">
      <Text className="font-display text-sm text-app-muted">
        Showing {start}-{end} of {totalItems} transactions
      </Text>

      <View className="flex-row items-center gap-2 self-end">
        <Pressable
          className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30"
          disabled={currentPage === 1}>
          <MaterialCommunityIcons name="chevron-left" size={20} color="#E5E7EB" />
        </Pressable>

        {pages.map((page) => {
          const isActive = page === currentPage;

          return (
            <Pressable
              key={page}
              className={`h-10 w-10 items-center justify-center rounded-2xl border ${
                isActive
                  ? "border-app-primary bg-app-primary"
                  : "border-app-border bg-app-panel/30"
              }`}>
              <Text
                className={`font-display text-base font-semibold ${
                  isActive ? "text-app-primary-contrast" : "text-app-text"
                }`}>
                {page}
              </Text>
            </Pressable>
          );
        })}

        <Pressable
          className="h-10 w-10 items-center justify-center rounded-2xl border border-app-border bg-app-panel/30"
          disabled={currentPage === totalPages}>
          <MaterialCommunityIcons name="chevron-right" size={20} color="#E5E7EB" />
        </Pressable>
      </View>
    </View>
  );
}
