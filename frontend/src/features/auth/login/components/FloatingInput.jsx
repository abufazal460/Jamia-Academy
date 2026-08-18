import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail } from "lucide-react";
import { useFloatingLabel } from "../../../../hooks/useFloatingLabel";
import {
  floatingLabelVariants,
  errorMessageVariants,
} from "../../../../utils/animationVariants";

/**
 * FloatingInput
 * Rounded glass input with a floating label that smoothly moves to the
 * top-border-center on focus/value, aur ek chhota icon right side me
 * (email ke liye Mail icon). Reusable rakha hai taaki future me kisi
 * aur text field ke liye bhi kaam aa sake.
 *
 * Required props:
 * - id, name, label, placeholder, value, onChange, onBlur
 * - error: string (empty string = no error)
 * - touched: boolean — error sirf tab dikhta hai jab field touch ho chuki ho
 */
function FloatingInput({
  id,
  name,
  type = "text",
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error = "",
  touched = false,
  autoComplete,
  iconLabel = "",
}) {
  const { isFocused, isFloating, handleFocus, handleBlur } = useFloatingLabel(value);
  const showError = touched && Boolean(error);

  const handleBlurCombined = (event) => {
    handleBlur();
    onBlur?.(event);
  };

  return (
    <div className="w-full ">
      <div
        className={[
          "relative flex items-center rounded-2xl border bg-white/[0.03]",
          "px-4 py-3.5 transition-colors duration-300",
          showError
            ? "border-red-400/70"
            : isFocused
            ? "border-sky-300/70 shadow-[0_0_0_4px_rgba(56,189,248,0.12)]"
            : "border-white/15 hover:border-white/25",
        ].join(" ")}
      >
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlurCombined}
          autoComplete={autoComplete}
          placeholder={isFocused ? placeholder : ""}
          aria-label={label}
          aria-invalid={showError}
          aria-describedby={showError ? `${id}-error` : undefined}
          className="peer w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/30"
        />

        {/* Floating label */}
        <motion.label
          htmlFor={id}
          variants={floatingLabelVariants}
          animate={isFloating ? "floating" : "resting"}
          className={[
            "pointer-events-none absolute origin-left select-none rounded-full px-1.5",
            "text-sm text-white/50",
            isFloating ? "bg-[#0b0f1a] text-sky-200/90" : "",
          ].join(" ")}
        >
          {label}
        </motion.label>

        {/* Right-side icon */}
        <Mail
          aria-label={iconLabel}
          className="ml-2 h-4 w-4 shrink-0 text-white/40 peer-focus:text-sky-300/80 transition-colors duration-300"
        />
      </div>

      {/* Error message */}
      <AnimatePresence initial={false}>
        {showError && (
          <motion.p
            id={`${id}-error`}
            role="alert"
            variants={errorMessageVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="mt-1.5 overflow-hidden pl-1 text-xs text-red-300"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export default memo(FloatingInput);
