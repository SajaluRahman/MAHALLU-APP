// hooks/useIsSmallScreen.ts
import { useEffect, useState } from "react";

const useIsSmallScreen = (breakpoint = 1025) => {
  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= breakpoint : true
  );

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth >= breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isSmallScreen;
};

export default useIsSmallScreen;
