import {
  useCreateSkill,
  useUpdateSkill,
  useDeleteSkill,
} from "@app/api/hooks/useAdmin";
import AdminLayout from "@app/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface SkillRecord {
  id: string;
  category: string;
  items: string[];
}

interface SkillForm {
  category: string;
  items: string;
}

const EMPTY_FORM: SkillForm = { category: "", items: "" };

const useSkillsRaw = () =>
  useQuery<SkillRecord[]>({
    queryKey: ["skills-raw"],
    queryFn: async () => {
      const { data } = await api.get("/skills/raw");
      return data;
    },
  });

export default function SkillsAdmin() {
  const { data: skills = [], isLoading } = useSkillsRaw();
  const createSkill = useCreateSkill();
  const updateSkill = useUpdateSkill();
  const deleteSkill = useDeleteSkill();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SkillForm>(EMPTY_FORM);

  const openCreate = () => {
    setEditingId("new");
    setForm(EMPTY_FORM);
  };

  const openEdit = (skill: SkillRecord) => {
    setEditingId(skill.id);
    setForm({ category: skill.category, items: skill.items.join(", ") });
  };

  const parseItems = (raw: string) =>
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleSave = async () => {
    const payload = { category: form.category, items: parseItems(form.items) };
    const promise =
      editingId === "new"
        ? createSkill.mutateAsync(payload)
        : updateSkill.mutateAsync({ id: editingId!, data: payload });

    toast.promise(promise, {
      loading: editingId === "new" ? "Đang thêm..." : "Đang cập nhật...",
      success:
        editingId === "new" ? "Thêm mới thành công!" : "Cập nhật thành công!",
      error: (err: any) => {
        const d = err.response?.data;
        if (d?.errors?.length)
          return d.errors.map((e: any) => e.message).join(", ");
        return d?.message || "Lưu thất bại";
      },
    });

    try {
      await promise;
      setEditingId(null);
    } catch {}
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Xóa skill category này?")) return;
    toast.promise(deleteSkill.mutateAsync(id), {
      loading: "Đang xóa...",
      success: "Đã xóa!",
      error: "Xóa thất bại",
    });
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="text-white">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Skills</h1>
        <button
          onClick={openCreate}
          className="btn-primary px-6 py-2 rounded-xl text-sm"
        >
          + Add Category
        </button>
      </div>

      <div className="grid gap-4">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="glass p-6 rounded-2xl border border-white/5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-bold mb-3">{skill.category}</h3>
                <div className="flex flex-wrap gap-1.5">
                  {skill.items.map((item) => (
                    <span key={item} className="tag text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => openEdit(skill)}
                  className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {skills.length === 0 && (
          <div className="glass p-12 rounded-2xl border border-white/5 text-center text-slate-500">
            Chưa có skill nào. Nhấn "+ Add Category" để thêm.
          </div>
        )}
      </div>

      {/* Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-lg w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId === "new"
                ? "Add Skill Category"
                : "Edit Skill Category"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">
                  Category name
                </label>
                <input
                  placeholder='e.g. "Backend Frameworks"'
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1.5 block">
                  Items{" "}
                  <span className="text-slate-600">
                    (comma-separated, e.g. Node.js, Express, NestJS)
                  </span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Node.js, Express, NestJS, Fastify"
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                  value={form.items}
                  onChange={(e) => setForm({ ...form, items: e.target.value })}
                />
                {form.items && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {parseItems(form.items).map((item) => (
                      <span key={item} className="tag text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setEditingId(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="btn-primary px-8 py-2 rounded-xl"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
