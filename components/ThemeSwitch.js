import { useEffect, useState } from "react";

import Icon from "./Icon";
import { useTheme } from "next-themes";
import { FI } from "react-icons";
function ThemeSwitch() {
  const [mounted, setMounted] = useState();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <div
      onClick={() => {
        setTheme(
          theme === "dark" || resolvedTheme === "dark" ? "light" : "dark"
        );
      }}
    >
      {mounted && <Icon>{theme === "dark" ? "moon" : "sun"}</Icon>}
    </div>
  );
}

export default ThemeSwitch;
