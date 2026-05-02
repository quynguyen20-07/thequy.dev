import { useState } from "react";

interface FloatTextareaProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
  className?: string;
}

export default function FloatTextarea({
  label,
  value,
  onChange,
  required,
  rows = 3,
  className = "",
}: FloatTextareaProps) {
  const [focused, setFocused] = useState(false);
  const floating = focused || value.length > 0;

  return (
    <div className={`relative mt-6 ${className}`}>
      <textarea
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        required={required}
        rows={rows}
        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 pt-5 pb-2 text-white outline-none focus:border-primary-500 transition-colors resize-none"
      />
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-150 ${
          floating
            ? "-top-2.5 text-xs px-1 bg-slate-900 text-primary-400"
            : "top-4 text-sm text-slate-400"
        }`}
      >
        {label}
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>
    </div>
  );
}
