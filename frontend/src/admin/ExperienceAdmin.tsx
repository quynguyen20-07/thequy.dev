import {
  useCreateExperience,
  useUpdateExperience,
  useDeleteExperience,
} from "@app/api/hooks/useAdmin";
import FloatDatePicker from "@app/components/FloatDatePicker";
import FloatTextarea from "@app/components/FloatTextarea";
import FloatCheckbox from "@app/components/FloatCheckbox";
import { useExperiences } from "@app/api/hooks/useCommon";
import FloatField from "@app/components/FloatField";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";

export default function ExperienceAdmin() {
  const { data: experiences = [], isLoading } = useExperiences();
  const createMutation = useCreateExperience();
  const updateMutation = useUpdateExperience();
  const deleteMutation = useDeleteExperience();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = async () => {
    const promise =
      editingId === "new"
        ? createMutation.mutateAsync(formData)
        : updateMutation.mutateAsync({ id: editingId!, data: formData });

    toast.promise(promise, {
      loading: "Saving experience...",
      success: "Experience saved successfully!",
      error: (err: any) => {
        const data = err.response?.data;
        if (data?.errors && Array.isArray(data.errors)) {
          return data.errors.map((e: any) => e.message).join(", ");
        }
        return data?.message || "Failed to save experience";
      },
    });

    try {
      await promise;
      setEditingId(null);
    } catch (e) {}
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Delete this experience?")) {
      const promise = deleteMutation.mutateAsync(id);
      toast.promise(promise, {
        loading: "Deleting...",
        success: "Deleted!",
        error: "Failed to delete",
      });
    }
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Experience</h1>
        <button
          onClick={() => {
            setEditingId("new");
            setFormData({});
          }}
          className="btn-primary px-6 py-2 rounded-xl text-sm"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp: any) => (
          <div
            key={exp.id}
            className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between"
          >
            <div>
              <h3 className="text-lg font-bold text-white">{exp.role}</h3>
              <p className="text-slate-400">
                {exp.company} •{" "}
                {exp.startDate ? new Date(exp.startDate).getFullYear() : ""} -{" "}
                {exp.current
                  ? "Present"
                  : exp.endDate
                    ? new Date(exp.endDate).getFullYear()
                    : ""}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setEditingId(exp.id);
                  // Convert dates to Date objects for the form
                  const formattedExp = {
                    ...exp,
                    startDate: exp.startDate ? new Date(exp.startDate) : null,
                    endDate: exp.endDate ? new Date(exp.endDate) : null,
                  };
                  setFormData(formattedExp);
                }}
                className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-xl w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              Experience Details
            </h2>
            <div className="space-y-4">
              <FloatField
                label="Company"
                value={formData.company || ""}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                required
              />

              <FloatField
                label="Role"
                value={formData.role || ""}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FloatDatePicker
                  label="Start Date"
                  value={formData.startDate || null}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      startDate: value,
                    })
                  }
                  required
                />

                <FloatDatePicker
                  label="End Date"
                  value={formData.endDate || null}
                  onChange={(value) =>
                    setFormData({
                      ...formData,
                      endDate: value,
                    })
                  }
                  disabled={formData.current}
                />
              </div>

              <FloatCheckbox
                label="Currently working here"
                checked={formData.current || false}
                onChange={(checked) =>
                  setFormData({
                    ...formData,
                    current: checked,
                    endDate: checked ? null : formData.endDate,
                  })
                }
              />

              <FloatTextarea
                label="Description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                required
                rows={4}
              />

              <FloatField
                label="Technologies (comma-separated)"
                value={formData.tech ? formData.tech.join(", ") : ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    tech: e.target.value
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean),
                  })
                }
                required
              />
            </div>
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setEditingId(null)}
                className="text-slate-400"
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
