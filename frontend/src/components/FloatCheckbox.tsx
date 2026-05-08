interface FloatCheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export default function FloatCheckbox({
  label,
  checked,
  onChange,
  className = "",
}: FloatCheckboxProps) {
  return (
    <div className={`relative mt-6 ${className}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4 bg-white/5 border border-white/10 rounded text-primary-500 focus:ring-primary-500 focus:ring-2"
        />
        <span className="text-sm text-slate-400">{label}</span>
      </label>
    </div>
  );
}
