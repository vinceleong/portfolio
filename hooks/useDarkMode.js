import { useTheme } from "next-themes";

export default function useDarkMode() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = theme === "dark" && resolvedTheme === "dark";
  return { isDarkMode, setTheme };
}
