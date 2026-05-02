import { useProjects, useCreateProject } from "@app/api/hooks/useProjects";
import { handleApiError } from "@app/commons/helper/handleApiError";
import type { CreateProjectInput } from "@app/api/types/project";
import { parseList } from "@app/commons/helper/formUtils";
import { GRADIENT_OPTIONS } from "@app/commons/constant";
import toast from "react-hot-toast";
import { useState } from "react";

const EMPTY_FORM: CreateProjectInput = {
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

export default function AdminProjects() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const [form, setForm] = useState<CreateProjectInput>(EMPTY_FORM);
  const [responsibilitiesInput, setResponsibilitiesInput] = useState("");
  const [achievementsInput, setAchievementsInput] = useState("");
  const [techInput, setTechInput] = useState("");

  const setField = <K extends keyof CreateProjectInput>(
    key: K,
    value: CreateProjectInput[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const responsibilities = parseList(responsibilitiesInput);
    const achievements = parseList(achievementsInput);
    const tech = parseList(techInput);

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
    if (!form.color) {
      toast.error("Chọn màu cho project.");
      return;
    }

    createProject.mutate(
      {
        ...form,
        responsibilities,
        achievements,
        tech,
        link: form.link?.trim() ? form.link : null,
      },
      {
        onSuccess: () => {
          toast.success("Project created successfully!");
          setForm(EMPTY_FORM);
          setResponsibilitiesInput("");
          setAchievementsInput("");
          setTechInput("");
        },
        onError: handleApiError,
      },
    );
  };

  if (isLoading)
    return <div className="p-8 text-white">Loading projects...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Projects</h1>

      <form
        onSubmit={handleCreate}
        className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 glass"
      >
        <h2 className="text-xl text-white font-bold mb-4">Add New Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <input
            value={form.title}
            onChange={(e) => setField("title", e.target.value)}
            placeholder="Project Title"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            value={form.company}
            onChange={(e) => setField("company", e.target.value)}
            placeholder="Company Name"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            value={form.role}
            onChange={(e) => setField("role", e.target.value)}
            placeholder="Role"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            value={form.period}
            onChange={(e) => setField("period", e.target.value)}
            placeholder="Period (vd: 2023 - 2024)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            value={form.category}
            onChange={(e) => setField("category", e.target.value)}
            placeholder="Category"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            value={form.icon}
            onChange={(e) => setField("icon", e.target.value)}
            placeholder="Icon (emoji hoặc class)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input
            type="url"
            value={form.link ?? ""}
            onChange={(e) => setField("link", e.target.value || null)}
            placeholder="Link (optional)"
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <label className="flex items-center gap-2 text-slate-300 self-center">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setField("featured", e.target.checked)}
              className="w-4 h-4"
            />
            Featured project
          </label>
        </div>

        {/* Color picker */}
        <div className="mb-4">
          <p className="text-slate-400 text-sm mb-2">
            Chọn màu gradient{" "}
            {form.color && (
              <span className="text-slate-300">
                — đã chọn:{" "}
                <code className="text-primary-400">{form.color}</code>
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
                className={`w-10 h-10 rounded-lg border-2 transition-all ${
                  form.color === opt.value
                    ? "border-white scale-110 shadow-lg"
                    : "border-transparent hover:border-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-4">
          <textarea
            value={form.shortDescription}
            onChange={(e) => setField("shortDescription", e.target.value)}
            placeholder="Short Description (min 10 ký tự)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none min-h-20"
          />
          <textarea
            value={form.description}
            onChange={(e) => setField("description", e.target.value)}
            placeholder="Description (min 20 ký tự)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none min-h-28"
          />
          <textarea
            value={responsibilitiesInput}
            onChange={(e) => setResponsibilitiesInput(e.target.value)}
            placeholder="Responsibilities (mỗi dòng hoặc ngăn cách bằng dấu phẩy)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none min-h-20"
          />
          <textarea
            value={achievementsInput}
            onChange={(e) => setAchievementsInput(e.target.value)}
            placeholder="Achievements (mỗi dòng hoặc ngăn cách bằng dấu phẩy)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none min-h-20"
          />
          <textarea
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            placeholder="Tech stack (mỗi dòng hoặc ngăn cách bằng dấu phẩy)"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none min-h-20"
          />
        </div>
        <button
          type="submit"
          className="btn-primary"
          disabled={createProject.isPending}
        >
          {createProject.isPending ? "Saving..." : "Add Project"}
        </button>
      </form>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden glass">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white">Project Title</th>
              <th className="p-4 font-semibold text-white">Company</th>
              <th className="p-4 font-semibold text-white">Category</th>
              <th className="p-4 font-semibold text-white text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {projects?.map((p) => (
              <tr
                key={p.id}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="p-4 text-white font-medium">{p.title}</td>
                <td className="p-4">{p.company}</td>
                <td className="p-4">
                  <span className="tag-accent text-xs">{p.category}</span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 mr-4 text-sm font-medium transition-colors">
                    Edit
                  </button>
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {(!projects || projects.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">
                  No projects found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
