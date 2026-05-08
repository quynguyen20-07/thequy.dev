import {
  useContactMethods,
  useCreateContactMethod,
  useUpdateContactMethod,
  useDeleteContactMethod,
  type ContactMethod,
} from "@app/api/hooks/useContactMethods";
import FloatField from "@app/components/FloatField";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";

type MethodForm = Omit<ContactMethod, "id">;

const ICON_TYPES = [
  "email",
  "github",
  "linkedin",
  "phone",
  "twitter",
  "website",
];

const EMPTY_FORM: MethodForm = {
  label: "",
  value: "",
  href: "",
  description: "",
  iconType: "email",
  color: "from-primary-500/20 to-primary-600/10 border-primary-500/30",
  iconColor: "text-primary-400",
  order: 0,
};

export default function ContactAdmin() {
  const { data: methods = [], isLoading } = useContactMethods();
  const createMethod = useCreateContactMethod();
  const updateMethod = useUpdateContactMethod();
  const deleteMethod = useDeleteContactMethod();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<MethodForm>(EMPTY_FORM);

  const openCreate = () => {
    setEditingId("new");
    setForm(EMPTY_FORM);
  };

  const openEdit = (m: ContactMethod) => {
    setEditingId(m.id);
    setForm({
      label: m.label,
      value: m.value,
      href: m.href,
      description: m.description,
      iconType: m.iconType,
      color: m.color,
      iconColor: m.iconColor,
      order: m.order,
    });
  };

  const handleSave = async () => {
    const promise =
      editingId === "new"
        ? createMethod.mutateAsync(form)
        : updateMethod.mutateAsync({ id: editingId!, data: form });

    toast.promise(promise, {
      loading: "Saving...",
      success: "Saved!",
      error: (err: any) =>
        err.response?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Failed to save",
    });

    try {
      await promise;
      setEditingId(null);
    } catch {}
  };

  const handleDelete = (id: string) => {
    if (!window.confirm("Delete this contact method?")) return;
    toast.promise(deleteMethod.mutateAsync(id), {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Failed to delete",
    });
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
        <h1 className="text-3xl font-black text-white">Contact Methods</h1>
        <button
          onClick={openCreate}
          className="btn-primary px-6 py-2 rounded-xl text-sm"
        >
          + Add
        </button>
      </div>

      <div className="space-y-4">
        {methods.map((m: ContactMethod) => (
          <div
            key={m.id}
            className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4">
              <span className="text-2xl capitalize">{m.iconType}</span>
              <div>
                <h3 className="text-white font-bold">{m.label}</h3>
                <p className="text-slate-400 text-sm">{m.value}</p>
                <p className="text-slate-500 text-xs">{m.description}</p>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                onClick={() => openEdit(m)}
                className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(m.id)}
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
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId === "new"
                ? "Add Contact Method"
                : "Edit Contact Method"}
            </h2>
            <div className="space-y-4">
              <FloatField
                label="Label"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
                required
              />

              <FloatField
                label="Value"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
                required
              />

              <FloatField
                label="Href"
                value={form.href}
                onChange={(e) => setForm({ ...form, href: e.target.value })}
                required
              />

              <FloatField
                label="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                required
              />

              <div>
                <label className="text-slate-400 text-sm mb-2 block">
                  Icon Type
                </label>
                <select
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                  value={form.iconType}
                  onChange={(e) =>
                    setForm({ ...form, iconType: e.target.value })
                  }
                >
                  {ICON_TYPES.map((t) => (
                    <option key={t} value={t} className="bg-slate-900">
                      {t}
                    </option>
                  ))}
                </select>
              </div>

              <FloatField
                label="Card Color Class"
                value={form.color}
                onChange={(e) => setForm({ ...form, color: e.target.value })}
                required
              />

              <FloatField
                label="Icon Color Class"
                value={form.iconColor}
                onChange={(e) =>
                  setForm({ ...form, iconColor: e.target.value })
                }
                required
              />

              <FloatField
                label="Order"
                type="number"
                value={String(form.order || 0)}
                onChange={(e) =>
                  setForm({ ...form, order: Number(e.target.value) })
                }
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
