import {
  useSkillsRaw,
  useCreateSkillMutation,
  useUpdateSkillMutation,
  useDeleteSkillMutation,
} from "@app/api/hooks/useSkills";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";
import type { SkillRecord, SkillInput } from "@app/api/types/skill";

// ─── Form state ───────────────────────────────────────────────────────────────

interface SkillForm {
  category: string;
  items: string; // comma-separated string for the textarea
}

const EMPTY_FORM: SkillForm = { category: "", items: "" };

// ─── Helpers ─────────────────────────────────────────────────────────────────

const parseItems = (raw: string): string[] =>
  raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const toForm = (skill: SkillRecord): SkillForm => ({
  category: skill.category,
  items: skill.items.join(", "),
});

// ─── Modal ───────────────────────────────────────────────────────────────────

interface SkillModalProps {
  editingId: string; // "new" | existing id
  form: SkillForm;
  onChange: (form: SkillForm) => void;
  onSave: () => void;
  onCancel: () => void;
  saving: boolean;
}

function SkillModal({
  editingId,
  form,
  onChange,
  onSave,
  onCancel,
  saving,
}: SkillModalProps) {
  const preview = parseItems(form.items);
  const isNew = editingId === "new";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 w-full max-w-lg shadow-2xl shadow-black/50">
        <h2 className="text-2xl font-bold text-white mb-6">
          {isNew ? "Add Skill Category" : "Edit Skill Category"}
        </h2>

        <div className="space-y-5">
          {/* Category */}
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">
              Category name <span className="text-red-400">*</span>
            </label>
            <input
              id="skill-category"
              type="text"
              placeholder='e.g. "Backend Frameworks"'
              className="w-full bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl p-3 text-white placeholder-slate-600 outline-none transition-colors"
              value={form.category}
              onChange={(e) => onChange({ ...form, category: e.target.value })}
            />
          </div>

          {/* Items */}
          <div>
            <label className="text-slate-400 text-xs font-medium mb-1.5 block">
              Skills{" "}
              <span className="text-slate-600">
                (comma-separated, e.g. Node.js, Express, NestJS)
              </span>{" "}
              <span className="text-red-400">*</span>
            </label>
            <textarea
              id="skill-items"
              rows={4}
              placeholder="Node.js, Express, NestJS, Fastify"
              className="w-full bg-white/5 border border-white/10 focus:border-primary-500/50 rounded-xl p-3 text-white placeholder-slate-600 outline-none resize-none transition-colors"
              value={form.items}
              onChange={(e) => onChange({ ...form, items: e.target.value })}
            />
            {/* Live tag preview */}
            {preview.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-1.5">
                {preview.map((item) => (
                  <span key={item} className="tag text-xs">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="px-5 py-2 text-slate-400 hover:text-white transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            disabled={saving || !form.category.trim() || preview.length === 0}
            className="btn-primary px-8 py-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Skill card ───────────────────────────────────────────────────────────────

interface SkillCardProps {
  skill: SkillRecord;
  onEdit: (skill: SkillRecord) => void;
  onDelete: (id: string) => void;
}

function SkillCard({ skill, onEdit, onDelete }: SkillCardProps) {
  return (
    <div className="glass p-6 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
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
          <p className="text-slate-600 text-xs mt-3">
            {skill.items.length} skill{skill.items.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div className="flex gap-2 shrink-0">
          <button
            id={`edit-skill-${skill.id}`}
            onClick={() => onEdit(skill)}
            className="px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 rounded-lg text-xs transition-colors"
          >
            Edit
          </button>
          <button
            id={`delete-skill-${skill.id}`}
            onClick={() => onDelete(skill.id)}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg text-xs transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main admin page ──────────────────────────────────────────────────────────

export default function SkillsAdminV2() {
  const { data: skills = [], isLoading } = useSkillsRaw();
  const createSkill = useCreateSkillMutation();
  const updateSkill = useUpdateSkillMutation();
  const deleteSkill = useDeleteSkillMutation();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<SkillForm>(EMPTY_FORM);

  const openCreate = () => {
    setForm(EMPTY_FORM);
    setEditingId("new");
  };

  const openEdit = (skill: SkillRecord) => {
    setForm(toForm(skill));
    setEditingId(skill.id);
  };

  const handleClose = () => setEditingId(null);

  const handleSave = async () => {
    const payload: SkillInput = {
      category: form.category.trim(),
      items: parseItems(form.items),
    };

    const isNew = editingId === "new";
    const promise = isNew
      ? createSkill.mutateAsync(payload)
      : updateSkill.mutateAsync({ id: editingId!, data: payload });

    toast.promise(promise, {
      loading: isNew ? "Adding…" : "Updating…",
      success: isNew ? "Skill category added!" : "Skill category updated!",
      error: (err: any) => {
        const d = err?.response?.data;
        if (Array.isArray(d?.errors) && d.errors.length)
          return d.errors.map((e: any) => e.message).join(", ");
        return d?.message ?? "Save failed";
      },
    });

    try {
      await promise;
      handleClose();
    } catch {
      /* toast already shows error */
    }
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this skill category? This cannot be undone."))
      return;
    toast.promise(deleteSkill.mutateAsync(id), {
      loading: "Deleting…",
      success: "Skill category deleted!",
      error: "Delete failed",
    });
  };

  const isSaving = createSkill.isPending || updateSkill.isPending;

  return (
    <AdminLayout>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Skills</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage skill categories and items displayed on the Skills page.
          </p>
        </div>
        <button
          id="add-skill-btn"
          onClick={openCreate}
          className="btn-primary px-6 py-2 text-sm whitespace-nowrap"
        >
          + Add Category
        </button>
      </div>

      {/* Summary strip */}
      {!isLoading && skills.length > 0 && (
        <div className="flex gap-4 mb-6">
          <div className="glass rounded-xl px-5 py-3 text-sm">
            <span className="text-primary-400 font-bold">{skills.length}</span>
            <span className="text-slate-500 ml-1">categories</span>
          </div>
          <div className="glass rounded-xl px-5 py-3 text-sm">
            <span className="text-primary-400 font-bold">
              {skills.reduce((s, sk) => s + sk.items.length, 0)}
            </span>
            <span className="text-slate-500 ml-1">total skills</span>
          </div>
        </div>
      )}

      {/* List */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : skills.length === 0 ? (
        <div className="glass p-16 rounded-2xl border border-white/5 text-center">
          <span className="text-4xl block mb-4">🧩</span>
          <p className="text-slate-400 font-medium mb-1">No skill categories yet</p>
          <p className="text-slate-600 text-sm">
            Click "+ Add Category" to create your first skill category.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onEdit={openEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Modal */}
      {editingId && (
        <SkillModal
          editingId={editingId}
          form={form}
          onChange={setForm}
          onSave={handleSave}
          onCancel={handleClose}
          saving={isSaving}
        />
      )}
    </AdminLayout>
  );
}
