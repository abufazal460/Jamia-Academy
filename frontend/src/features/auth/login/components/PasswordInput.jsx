import { memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff } from "lucide-react";
import { useFloatingLabel } from "../../../../hooks/useFloatingLabel";
import { usePasswordToggle } from "../hooks/usePasswordToggle";
import {
  floatingLabelVariants,
  errorMessageVariants,
  iconToggleVariants,
} from "../../../../utils/animationVariants";
import { loginData } from "../data/login.data";

/**
 * PasswordInput
 * FloatingInput jaisa hi behavior, plus ek Eye/EyeOff toggle button jo
 * password visibility switch karta hai with smooth rotation/fade.
 */
function PasswordInput({
  id,
  name,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  error = "",
  touched = false,
  autoComplete,
}) {
  const { isFocused, isFloating, handleFocus, handleBlur } = useFloatingLabel(value);
  const { isVisible, inputType, toggleVisibility } = usePasswordToggle();
  const showError = touched && Boolean(error);

  const handleBlurCombined = (event) => {
    handleBlur();
    onBlur?.(event);
  };

  return (
    <div className="w-full">
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
          type={inputType}
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

        {/* Visibility toggle */}
        <button
          type="button"
          onClick={toggleVisibility}
          aria-label={
            isVisible ? loginData.a11y.togglePasswordHide : loginData.a11y.togglePasswordShow
          }
          className={[
            "ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            "text-white/40 transition-colors duration-300 hover:text-sky-300/90",
            "focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300/70",
          ].join(" ")}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isVisible ? (
              <motion.span
                key="eye-off"
                variants={iconToggleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex"
              >
                <EyeOff className="h-4 w-4" />
              </motion.span>
            ) : (
              <motion.span
                key="eye"
                variants={iconToggleVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex"
              >
                <Eye className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
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

export default memo(PasswordInput);
