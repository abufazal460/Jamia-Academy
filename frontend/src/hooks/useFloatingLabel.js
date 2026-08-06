import { useState, useCallback, useMemo } from "react";

/**
 * useFloatingLabel
 * Floating label ka focus + value state manage karta hai.
 * Label "floating" state me tab jaata hai jab input focused ho YA
 * usme value ho — dono me se koi bhi true hone par.
 *
 * @param {string} value - current input value (controlled parent se aata hai)
 * @returns {{
 *   isFocused: boolean,
 *   isFloating: boolean,
 *   handleFocus: () => void,
 *   handleBlur: () => void,
 * }}
 */
export function useFloatingLabel(value) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  // Value truthy check yahan memoize karte hain taaki parent re-render
  // pe unnecessary recalculation na ho.
  const isFloating = useMemo(
    () => isFocused || Boolean(value && value.length > 0),
    [isFocused, value]
  );

  return { isFocused, isFloating, handleFocus, handleBlur };
}

export default useFloatingLabel;
