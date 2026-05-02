import { useState, useRef, useEffect } from "react";

const EMOJI_GROUPS: { label: string; emojis: string[] }[] = [
  {
    label: "Tech & Dev",
    emojis: [
      "💻",
      "🖥️",
      "📱",
      "⌨️",
      "🖱️",
      "🖨️",
      "🔧",
      "⚙️",
      "🔩",
      "🛠️",
      "📡",
      "🔌",
      "💾",
      "💿",
      "📀",
    ],
  },
  {
    label: "Data & AI",
    emojis: [
      "🤖",
      "🧠",
      "📊",
      "📈",
      "📉",
      "🔬",
      "🧬",
      "🧪",
      "⚗️",
      "🔭",
      "📐",
      "📏",
      "🗃️",
      "🗂️",
      "📋",
    ],
  },
  {
    label: "Cloud & Network",
    emojis: [
      "☁️",
      "🌐",
      "🛰️",
      "📶",
      "🔐",
      "🛡️",
      "🔑",
      "🗝️",
      "🔒",
      "🔓",
      "🌍",
      "🌎",
      "🌏",
      "🕸️",
      "📲",
    ],
  },
  {
    label: "Business & Product",
    emojis: [
      "🚀",
      "💡",
      "🎯",
      "🏆",
      "💎",
      "💳",
      "🛒",
      "📦",
      "🏢",
      "📝",
      "✅",
      "🎨",
      "🎬",
      "📸",
      "🎵",
    ],
  },
  {
    label: "Health & Education",
    emojis: [
      "🏥",
      "🎓",
      "📚",
      "🩺",
      "💊",
      "🧬",
      "🏫",
      "🎒",
      "✏️",
      "📖",
      "🗺️",
      "🌿",
      "♻️",
      "🌱",
      "🌾",
    ],
  },
  {
    label: "Fun & Games",
    emojis: [
      "🎮",
      "🕹️",
      "🃏",
      "♟️",
      "🎲",
      "🧩",
      "🎪",
      "🎭",
      "🎠",
      "🎡",
      "🎢",
      "🎆",
      "✨",
      "🌊",
      "🔥",
    ],
  },
];

interface EmojiPickerFieldProps {
  value: string;
  onChange: (emoji: string) => void;
  required?: boolean;
}

export default function EmojiPickerField({
  value,
  onChange,
  required,
}: EmojiPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const allEmojis = EMOJI_GROUPS.flatMap((g) => g.emojis);
  const filtered = search.trim()
    ? allEmojis.filter((e) => e.includes(search))
    : null;

  const groups = filtered
    ? [{ label: "Kết quả", emojis: filtered }]
    : EMOJI_GROUPS;

  return (
    <div className="relative mt-6" ref={ref}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 bg-white/5 border rounded-xl px-4 pt-5 pb-2 text-left outline-none transition-colors ${
          open ? "border-primary-500" : "border-white/10 hover:border-white/30"
        }`}
      >
        {value ? (
          <>
            <span className="text-2xl leading-none">{value}</span>
            <span className="text-white text-sm">{value}</span>
          </>
        ) : (
          <span className="text-slate-500 text-sm">Chọn icon...</span>
        )}
      </button>

      {/* Floating label */}
      <label
        className={`pointer-events-none absolute left-4 transition-all duration-150 ${
          value || open
            ? "-top-2.5 text-xs px-1 bg-slate-900 text-primary-400"
            : "top-1/2 -translate-y-1/2 text-sm text-slate-400"
        }`}
      >
        Icon
        {required && <span className="text-rose-400 ml-0.5">*</span>}
      </label>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 top-full left-0 mt-2 w-full bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-3 max-h-72 overflow-y-auto">
          <input
            type="text"
            placeholder="Tìm emoji..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-primary-500 mb-3"
            autoFocus
          />
          {groups.map((group) => (
            <div key={group.label} className="mb-3">
              <p className="text-xs text-slate-500 mb-1 font-medium uppercase tracking-wide">
                {group.label}
              </p>
              <div className="flex flex-wrap gap-1">
                {group.emojis.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    title={emoji}
                    onClick={() => {
                      onChange(emoji);
                      setOpen(false);
                      setSearch("");
                    }}
                    className={`w-9 h-9 text-xl rounded-lg flex items-center justify-center transition-all hover:bg-white/10 ${
                      value === emoji
                        ? "bg-primary-500/20 ring-1 ring-primary-500"
                        : ""
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))}
          {groups[0].emojis.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-4">
              Không tìm thấy emoji nào.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
