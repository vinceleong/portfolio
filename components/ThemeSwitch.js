import { useEffect, useState } from "react";

import Icon from "./Icon";
import useDarkMode from "hooks/useDarkMode";
import { useTheme } from "next-themes";

function ThemeSwitch() {
  const [mounted, setMounted] = useState();

  const { theme, setTheme, resolvedTheme } = useTheme();
  const isDarkMode = theme === "dark" && resolvedTheme === "dark";

  useEffect(() => setMounted(true), []);

  return (
    <div
      onClick={() => {
        setTheme(isDarkMode ? "light" : "dark");
      }}
    >
      {mounted && <Icon>{isDarkMode ? "sun" : "moon"}</Icon>}
    </div>
  );
}

export default ThemeSwitch;
