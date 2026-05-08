import {
  useEducation,
  useCreateEducation,
  useUpdateEducation,
  useDeleteEducation,
} from "@app/api/hooks/useAdminCommon";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";

interface EducationForm {
  degree: string;
  institution: string;
  period: string;
  note: string;
}

export default function EducationAdmin() {
  const { data: educationList = [], isLoading } = useEducation();
  const createMutation = useCreateEducation();
  const updateMutation = useUpdateEducation();
  const deleteMutation = useDeleteEducation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EducationForm>({
    degree: "",
    institution: "",
    period: "",
    note: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = !!editingId;
    const promise = isEditing
      ? updateMutation.mutateAsync({ id: editingId!, data: form })
      : createMutation.mutateAsync(form);

    toast.promise(promise, {
      loading: isEditing ? "Đang cập nhật..." : "Đang thêm mới...",
      success: isEditing ? "Cập nhật thành công!" : "Thêm mới thành công!",
      error: (err: any) => {
        const d = err.response?.data;
        if (d?.errors?.length)
          return d.errors.map((e: any) => e.message).join(", ");
        return (
          d?.message || (isEditing ? "Cập nhật thất bại" : "Thêm mới thất bại")
        );
      },
    });

    try {
      await promise;
      setForm({ degree: "", institution: "", period: "", note: "" });
      setEditingId(null);
    } catch {}
  };

  const handleEdit = (education: any) => {
    setEditingId(education.id);
    setForm({
      degree: education.degree,
      institution: education.institution,
      period: education.period,
      note: education.note,
    });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc muốn xóa?")) return;
    toast.promise(deleteMutation.mutateAsync(id), {
      loading: "Đang xóa...",
      success: "Đã xóa!",
      error: "Xóa thất bại",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ degree: "", institution: "", period: "", note: "" });
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div className="text-white">Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div>
        <h2 className="text-2xl font-bold text-white mb-6">Quản lý Giáo dục</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="card p-6 space-y-4 mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Bằng cấp
              </label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) => setForm({ ...form, degree: e.target.value })}
                placeholder="e.g., Bachelor of Science"
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Trường/Cơ sở
              </label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) =>
                  setForm({ ...form, institution: e.target.value })
                }
                placeholder="e.g., University of Greenwich"
                className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Thời gian
            </label>
            <input
              type="text"
              value={form.period}
              onChange={(e) => setForm({ ...form, period: e.target.value })}
              placeholder="e.g., 2018 - 2023"
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-white text-sm font-medium mb-2">
              Ghi chú
            </label>
            <textarea
              value={form.note}
              onChange={(e) => setForm({ ...form, note: e.target.value })}
              placeholder="Nhập ghi chú chi tiết..."
              rows={3}
              className="w-full px-4 py-2 bg-slate-700 text-white rounded-lg border border-slate-600 focus:border-primary-500 focus:outline-none"
              required
            />
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
          {educationList.map((education: any) => (
            <article
              key={education.id}
              className="card p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <svg
                    className="w-5 h-5 text-primary-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                  </svg>
                  <h3 className="text-white font-bold">{education.degree}</h3>
                </div>
                <p className="text-primary-400 text-sm ml-8">
                  {education.institution}
                </p>
                <p className="text-slate-400 text-sm ml-8">
                  {education.period}
                </p>
                <p className="text-slate-500 text-xs mt-2 ml-8 leading-relaxed">
                  {education.note}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(education)}
                  className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 text-sm"
                >
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(education.id)}
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
    </AdminLayout>
  );
}
