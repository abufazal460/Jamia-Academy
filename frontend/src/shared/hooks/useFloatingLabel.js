import { useState, useCallback, useMemo } from "react";

export function useFloatingLabel(value) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const isFloating = useMemo(
    () => isFocused || Boolean(value && value.length > 0),
    [isFocused, value]
  );

  return { isFocused, isFloating, handleFocus, handleBlur };
}

export default useFloatingLabel;
