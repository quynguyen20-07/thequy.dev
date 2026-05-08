import { useState } from "react";

interface FloatDatePickerProps {
  label: string;
  value: Date | null;
  onChange: (value: Date | null) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export default function FloatDatePicker({
  label,
  value,
  onChange,
  required,
  disabled,
  className = "",
}: FloatDatePickerProps) {
  const [focused, setFocused] = useState(false);
  const floating = focused || !!value;

  // Convert Date to YYYY-MM format for input
  const getInputValue = () => {
    if (!value) return "";
    return value.toISOString().substring(0, 7); // YYYY-MM
  };

  // Format display value to MM-YYYY
  const formatDisplayValue = () => {
    if (!value) return "";
    return value.toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue) {
      // Create date from YYYY-MM-01
      const date = new Date(inputValue + "-01");
      onChange(date);
    } else {
      onChange(null);
    }
  };

  return (
    <div className={`relative mt-6 ${className}`}>
      <input
        type="month"
        value={getInputValue()}
        onChange={handleChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        disabled={disabled}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:border-primary-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-150 ${
          floating
            ? "-top-2.5 text-xs px-1 bg-slate-900 text-primary-400"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
        }`}
      >
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
      {value && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-500 pointer-events-none">
          {formatDisplayValue()}
        </div>
      )}
    </div>
  );
}
