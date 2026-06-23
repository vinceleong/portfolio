import { useEffect, useState } from "react";

import Icon from "./Icon";
import { useTheme } from "next-themes";

function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  // next-themes reads the theme from localStorage on the client only, so
  // resolvedTheme is `undefined` during SSR but already resolved on the
  // client's first render. Delaying theme-dependent UI until after mount
  // keeps server/client output identical and avoids a hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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