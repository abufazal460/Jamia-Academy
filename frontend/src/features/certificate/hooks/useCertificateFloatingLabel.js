import { useCallback, useState } from "react";

/**
 * useCertificateFloatingLabel
 * Label ko top border par tab tak float rakhta hai jab tak field focused
 * ho ya usme value ho. Empty hote hi label wapas andar chali jaati hai —
 * yeh hi spec ka "return only if field becomes empty" requirement hai.
 */
export function useCertificateFloatingLabel(value) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  const isFloating = isFocused || Boolean(value && value.length > 0);

  return { isFloating, isFocused, handleFocus, handleBlur };
}
