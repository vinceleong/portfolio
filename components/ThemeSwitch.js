import { useEffect, useState } from "react";

import Icon from "./Icon";
import useDarkMode from "hooks/useDarkMode";

function ThemeSwitch() {
  const [mounted, setMounted] = useState();
  const { isDarkMode, setTheme } = useDarkMode();

  useEffect(() => setMounted(true), []);

  return (
    <div
      onClick={() => {
        setTheme(isDarkMode ? "light" : "dark");
      }}
    >
      {mounted && <Icon>{isDarkMode ? "moon" : "sun"}</Icon>}
    </div>
  );
}

export default ThemeSwitch;
