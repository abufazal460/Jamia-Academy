import { useState, useCallback, useMemo } from "react";

/**
 * usePasswordToggle
 * Password field ki visibility toggle karta hai (text <-> password).
 *
 * @returns {{
 *   isVisible: boolean,
 *   inputType: "text" | "password",
 *   toggleVisibility: () => void,
 * }}
 */
export function usePasswordToggle() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = useCallback(() => {
    setIsVisible((prev) => !prev);
  }, []);

  const inputType = useMemo(() => (isVisible ? "text" : "password"), [isVisible]);

  return { isVisible, inputType, toggleVisibility };
}

export default usePasswordToggle;
