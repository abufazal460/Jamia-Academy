import { useCallback, useState } from "react";

export function useCertificateFloatingLabel(value) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const isFloating = isFocused || Boolean(value && value.length > 0);

  return { isFloating, isFocused, handleFocus, handleBlur };
}
