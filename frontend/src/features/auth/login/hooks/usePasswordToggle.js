import { useState, useCallback, useMemo } from "react";

export function usePasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const inputType = useMemo(() => (isVisible ? "text" : "password"), [isVisible]);

  return { isVisible, inputType, toggleVisibility };
}

export default usePasswordToggle;
