import { memo, useState, useId } from "react";
import { motion } from "motion/react";

const FormField = ({ field, value, error, onChange }) => {
  const [focused, setFocused] = useState(false);
  const reactId = useId();
  const inputId = `${field.id}-${reactId}`;
  const isTextarea = field.type === "textarea";
  const isFloating = focused || value.length > 0;

  const sharedProps = {
    id: inputId,
    name: field.name,
    placeholder: focused ? field.placeholder : "",
    value,
    required: field.required,
    "aria-required": field.required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${inputId}-error` : undefined,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e) => onChange(field.name, e.target.value),
    className:
      "peer w-full rounded-xl border bg-white/60 px-4 pt-5 pb-2 text-sm text-[#2B2D42] outline-none backdrop-blur-sm transition-colors placeholder:text-[#2B2D42]/30 " +
      (error
        ? "border-[#E63946] focus:border-[#E63946]"
        : "border-[#2B2D42]/15 focus:border-[#2A9D8F]"),
  };

  return (
    <div className="relative">
      <label
        htmlFor={inputId}
        className={`pointer-events-none absolute left-4 transition-all duration-200 ${isFloating
            ? "top-1.5 text-[0.68rem] font-medium text-[#2A9D8F]"
            : "top-1/2 -translate-y-1/2 text-sm text-[#2B2D42]/45"
          }`}
      >
        {field.label}
        {field.required && <span className="text-[#E63946]"> *</span>}
      </label>

      {isTextarea ? (
        <textarea rows={4} {...sharedProps} />
      ) : (
        <input type={field.type} {...sharedProps} />
      )}

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="mt-1.5 text-xs font-medium text-[#E63946]"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(FormField);
