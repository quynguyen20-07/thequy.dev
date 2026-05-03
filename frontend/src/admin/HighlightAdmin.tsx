import {
  useHighlights,
  useCreateHighlight,
  useUpdateHighlight,
  useDeleteHighlight,
} from "@app/api/hooks/useAdminCommon";
import { useState } from "react";

const COLORS = [
  "text-yellow-400",
  "text-red-400",
  "text-blue-400",
  "text-green-400",
  "text-purple-400",
  "text-cyan-400",
];

interface HighlightForm {
  icon: string;
  title: string;
  description: string;
  color: string;
}

export default function HighlightAdmin() {
  const { data: highlights = [], isLoading } = useHighlights();
  const createMutation = useCreateHighlight();
  const updateMutation = useUpdateHighlight();
  const deleteMutation = useDeleteHighlight();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<HighlightForm>({
    icon: "",
    title: "",
    description: "",
    color: "text-yellow-400",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingId) {
      await updateMutation.mutateAsync({ id: editingId, data: form });
    } else {
      await createMutation.mutateAsync(form);
    }

    setForm({ icon: "", title: "", description: "", color: "text-yellow-400" });
    setEditingId(null);
  };

  const handleEdit = (highlight: any) => {
    setEditingId(highlight.id);
    setForm({
      icon: highlight.icon,
      title: highlight.title,
      description: highlight.description,
      color: highlight.color,
    });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc muốn xóa?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ icon: "", title: "", description: "", color: "text-yellow-400" });
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">
          Quản lý Highlights
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Biểu tượng (Emoji)
              </label>
              <input
                type="text"
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
                placeholder="e.g., ⚡"
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Tiêu đề
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., REST API Design"
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Mô tả
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Nhập mô tả chi tiết..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Màu sắc
            </label>
            <div className="grid grid-cols-6 gap-2">
              {COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setForm({ ...form, color })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    form.color === color ? "border-white" : "border-slate-600"
                  } bg-slate-700 flex items-center justify-center`}
                >
                  <span className={`text-2xl ${color}`}>🎨</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="flex-1 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 text-white font-medium py-2 rounded-lg transition-colors"
            >
              {editingId ? "Cập nhật" : "Thêm mới"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-slate-600 hover:bg-slate-700 text-white font-medium py-2 rounded-lg transition-colors"
              >
                Hủy
              </button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="grid gap-4">
          {highlights.map((highlight: any) => (
            <article
              key={highlight.id}
              className="card p-4 flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-4 flex-1">
                <span className="text-3xl">{highlight.icon}</span>
                <div className="flex-1">
                  <h3 className="text-white font-bold">{highlight.title}</h3>
                  <p className="text-slate-400 text-sm mt-1">
                    {highlight.description}
                  </p>
                  <span
                    className={`inline-block text-sm mt-2 ${highlight.color}`}
                  >
                    Màu: {highlight.color}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(highlight)}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 text-sm"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(highlight.id)}
                  disabled={deleteMutation.isPending}
                  className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 text-sm disabled:opacity-50"
                >
                  Xóa
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
