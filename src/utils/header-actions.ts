import { HeaderAction } from "@/components/header/Header";
import { usePathname, useRouter } from "expo-router";

export function useHeaderAction() {
  const pathname = usePathname();
  const router = useRouter();

  let headerAction: HeaderAction | undefined;

  switch (pathname) {
    case "/all-contexts":
      headerAction = {
        icon: "plus",
        label: "New Context",
        onPress: () => router.push({ pathname: "/all-contexts", params: { action: "new" } }),
      };
      break;
    case "/wealth":
    case "/asset-portfolio":
      headerAction = { icon: "plus", label: "Add Asset", onPress: () => router.push("/add-asset") };
      break;
  }

  return headerAction;
}
