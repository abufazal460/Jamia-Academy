import { memo, useState, useId } from "react";
import { ChevronDown } from "lucide-react";

const FormSelect = ({ field, value, error, onChange }) => {
  const [focused, setFocused] = useState(false);
  const reactId = useId();
  const selectId = `${field.id}-${reactId}`;
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={selectId}
        className={`pointer-events-none absolute left-4 z-10 transition-all duration-200 ${isFloating
            ? "top-1.5 text-[0.68rem] font-medium text-[#2A9D8F]"
            : "top-1/2 -translate-y-1/2 text-sm text-[#2B2D42]/45"
          }`}
      >
        {field.label}
        {field.required && <span className="text-[#E63946]"> *</span>}
      </label>

      <select
        id={selectId}
        name={field.name}
        value={value}
        required={field.required}
        aria-required={field.required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(field.name, e.target.value)}
        className={`peer w-full appearance-none rounded-xl border bg-white/60 px-4 pt-5 pb-2 text-sm text-[#2B2D42] outline-none backdrop-blur-sm transition-colors ${error
            ? "border-[#E63946] focus:border-[#E63946]"
            : "border-[#2B2D42]/15 focus:border-[#2A9D8F]"
          }`}
      >
        <option value="" disabled hidden />
        {field.options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <ChevronDown
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#2B2D42]/40"
        aria-hidden="true"
      />

      {error && (
        <p id={`${selectId}-error`} role="alert" className="mt-1.5 text-xs font-medium text-[#E63946]">
          {error}
        </p>
      )}
    </div>
  );
};

export default memo(FormSelect);
