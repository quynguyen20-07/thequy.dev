import {
  useCreateProject,
  useUpdateProject,
  useDeleteProject,
} from "@app/api/hooks/useAdmin";
import type { CreateProjectInput, Project } from "@app/api/types/project";
import { parseList, joinList } from "@app/commons/helper/formUtils";
import { handleApiError } from "@app/commons/helper/handleApiError";
import EmojiPickerField from "@app/components/EmojiPickerField";
import FloatTextarea from "@app/components/FloatTextarea";
import { useProjects } from "@app/api/hooks/useProjects";
import { GRADIENT_OPTIONS } from "@app/commons/constant";
import FloatField from "@app/components/FloatField";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";

const EMPTY: CreateProjectInput = {
  title: "",
  role: "",
  company: "",
  period: "",
  shortDescription: "",
  description: "",
  responsibilities: [],
  achievements: [],
  tech: [],
  category: "",
  featured: false,
  color: "",
  icon: "",
  link: null,
};

interface FormState extends CreateProjectInput {
  _responsibilitiesRaw: string;
  _achievementsRaw: string;
  _techRaw: string;
}

function toFormState(p: Partial<Project> = {}): FormState {
  return {
    ...EMPTY,
    ...p,
    _responsibilitiesRaw: joinList(p.responsibilities ?? []),
    _achievementsRaw: joinList(p.achievements ?? []),
    _techRaw: joinList(p.tech ?? []),
  };
}

export default function ProjectAdmin() {
  const { data: projects = [], isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(toFormState());

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const openCreate = () => {
    setForm(toFormState());
    setEditingId("new");
  };
  const openEdit = (p: Project) => {
    setForm(toFormState(p));
    setEditingId(p.id);
  };
  const closeModal = () => setEditingId(null);

  const handleSave = async () => {
    const responsibilities = parseList(form._responsibilitiesRaw);
    const achievements = parseList(form._achievementsRaw);
    const tech = parseList(form._techRaw);

    if (!form.color) {
      toast.error("Chọn màu cho project.");
      return;
    }
    if (responsibilities.length === 0) {
      toast.error("Thêm ít nhất 1 responsibility.");
      return;
    }
    if (achievements.length === 0) {
      toast.error("Thêm ít nhất 1 achievement.");
      return;
    }
    if (tech.length === 0) {
      toast.error("Thêm ít nhất 1 tech.");
      return;
    }

    const payload: CreateProjectInput = {
      title: form.title,
      role: form.role,
      company: form.company,
      period: form.period,
      shortDescription: form.shortDescription,
      description: form.description,
      category: form.category,
      featured: form.featured,
      color: form.color,
      icon: form.icon,
      link: form.link?.trim() || null,
      responsibilities,
      achievements,
      tech,
    };

    try {
      if (editingId === "new") {
        await createMutation.mutateAsync(payload);
        toast.success("Project created!");
      } else {
        await updateMutation.mutateAsync({ id: editingId!, data: payload });
        toast.success("Project updated!");
      }
      closeModal();
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Xoá project này?")) return;
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Deleted!");
    } catch (err) {
      handleApiError(err);
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading projects...</div>
      </AdminLayout>
    );

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Manage Projects</h1>
        <button
          onClick={openCreate}
          className="btn-primary px-6 py-2 rounded-xl text-sm"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projectList.map((project) => (
          <div
            key={project.id}
            className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="text-slate-400 text-sm">
                {project.company} • {project.period}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => openEdit(project)}
                className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project.id)}
                className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {projectList.length === 0 && (
          <p className="text-slate-500 text-center py-12">No projects yet.</p>
        )}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId === "new" ? "Create Project" : "Edit Project"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
              <FloatField
                label="Title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                required
              />
              <FloatField
                label="Company"
                value={form.company}
                onChange={(e) => setField("company", e.target.value)}
                required
              />
              <FloatField
                label="Role"
                value={form.role}
                onChange={(e) => setField("role", e.target.value)}
                required
              />
              <FloatField
                label="Period (vd: 2023 - 2024)"
                value={form.period}
                onChange={(e) => setField("period", e.target.value)}
                required
              />
              <FloatField
                label="Category"
                value={form.category}
                onChange={(e) => setField("category", e.target.value)}
                required
              />
              <EmojiPickerField
                value={form.icon}
                onChange={(emoji) => setField("icon", emoji)}
                required
              />
              <FloatField
                type="url"
                label="Link"
                value={form.link ?? ""}
                onChange={(e) => setField("link", e.target.value || null)}
                className="md:col-span-2"
              />
              <label className="flex items-center gap-2 text-slate-300 md:col-span-2 mt-4">
                <input
                  type="checkbox"
                  className="w-4 h-4"
                  checked={form.featured}
                  onChange={(e) => setField("featured", e.target.checked)}
                />
                Featured project
              </label>
            </div>

            {/* Color picker */}
            <div className="mb-4">
              <p className="text-slate-400 text-sm mb-2">
                Màu gradient *{" "}
                {form.color && (
                  <span className="text-slate-300">
                    — <code className="text-primary-400">{form.color}</code>
                  </span>
                )}
              </p>
              <div className="flex flex-wrap gap-2">
                {GRADIENT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    title={opt.label}
                    onClick={() => setField("color", opt.value)}
                    style={{ background: opt.css }}
                    className={`w-10 h-10 rounded-lg border-2 transition-all ${form.color === opt.value ? "border-white scale-110 shadow-lg" : "border-transparent hover:border-white/50"}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1">
              <FloatTextarea
                label="Short Description"
                value={form.shortDescription}
                onChange={(e) => setField("shortDescription", e.target.value)}
                required
                rows={2}
              />
              <FloatTextarea
                label="Description"
                value={form.description}
                onChange={(e) => setField("description", e.target.value)}
                required
                rows={4}
              />
              <FloatTextarea
                label="Responsibilities (mỗi dòng hoặc phân cách bằng dấu phẩy)"
                value={form._responsibilitiesRaw}
                onChange={(e) =>
                  setField("_responsibilitiesRaw", e.target.value)
                }
                required
                rows={3}
              />
              <FloatTextarea
                label="Achievements (mỗi dòng hoặc phân cách bằng dấu phẩy)"
                value={form._achievementsRaw}
                onChange={(e) => setField("_achievementsRaw", e.target.value)}
                required
                rows={3}
              />
              <FloatTextarea
                label="Tech stack (mỗi dòng hoặc phân cách bằng dấu phẩy)"
                value={form._techRaw}
                onChange={(e) => setField("_techRaw", e.target.value)}
                required
                rows={2}
              />
            </div>

            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="btn-primary px-8 py-2 rounded-xl disabled:opacity-50"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
