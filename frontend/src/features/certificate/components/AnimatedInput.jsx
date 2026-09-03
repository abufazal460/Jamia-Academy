import { memo, useEffect, useRef } from "react";
import { motion, useAnimationControls } from "motion/react";
import { FloatingLabel } from "./FloatingLabel";
import { useCertificateFloatingLabel } from "../hooks/useCertificateFloatingLabel";
import { certFieldItemVariants, certShakeVariants } from "../motion/certificate.motion";

function AnimatedInputBase({ field, value, error, onChange, onBlur, disabled }) {
  const { isFloating, handleFocus, handleBlur } = useCertificateFloatingLabel(value);
  const controls = useAnimationControls();
  const isMounted = useRef(false);
  const Icon = field.icon;
  const errorId = `${field.id}-error`;

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    if (error) {
      controls.start("shake");
    }
  }, [error, controls]);

  const handleBlurCombined = (event) => {
    handleBlur();
    onBlur?.(event);
  };

  return (
    <motion.div variants={certFieldItemVariants} className="w-full">
      <motion.div
        variants={certShakeVariants}
        animate={controls}
        initial="idle"
        className="group relative"
      >
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg transition-colors duration-300 ${error
              ? "text-[#E63946]"
              : "text-white/50"
            }`}
        >
          <Icon />
        </span>

        <input
          id={field.id}
          name={field.name}
          type={field.type}
          autoComplete={field.autoComplete}
          required={field.required}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlurCombined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`peer w-full rounded-full border bg-white/[0.05] py-3.5 pl-11 pr-4 text-[15px] text-white placeholder-transparent outline-none backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] disabled:cursor-not-allowed disabled:opacity-60 ${error
              ? "border-[#E63946]/70"
              : "border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)] hover:border-white/25 hover:shadow-[0_0_18px_rgba(42,157,143,0.18)] focus:border-[#2A9D8F]/70"
            }`}
        />

        <FloatingLabel
          htmlFor={field.id}
          text={field.label}
          isFloating={isFloating}
          direction={field.direction}
        />
      </motion.div>

      <div className="min-h-[1.1rem] pl-4 pt-1">
        {error && (
          <p id={errorId} role="alert" className="text-xs font-medium text-[#E63946]">
            {error}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export const AnimatedInput = memo(AnimatedInputBase);
