import {
  useHomeStats,
  useCreateHomeStat,
  useUpdateHomeStat,
  useDeleteHomeStat,
  type HomeStat,
} from "@app/api/hooks/useHomeStats";
import { useUpdateProfile } from "@app/api/hooks/useAdmin";
import { useProfile } from "@app/api/hooks/useCommon";
import AdminLayout from "@app/admin/AdminLayout";
import { toast } from "react-hot-toast";
import { useState } from "react";

type StatForm = Pick<HomeStat, "value" | "label" | "order">;

const EMPTY_STAT: StatForm = { value: "", label: "", order: 0 };

export default function HomeAdmin() {
  const { data: stats = [], isLoading } = useHomeStats();
  const { data: profile } = useProfile();

  const createStat = useCreateHomeStat();
  const updateStat = useUpdateHomeStat();
  const deleteStat = useDeleteHomeStat();
  const updateProfile = useUpdateProfile();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<StatForm>(EMPTY_STAT);

  // Hero badge editing state
  const [editingBadge, setEditingBadge] = useState(false);
  const [badgeValue, setBadgeValue] = useState("");

  const openCreate = () => {
    setEditingId("new");
    setForm(EMPTY_STAT);
  };

  const openEdit = (stat: HomeStat) => {
    setEditingId(stat.id);
    setForm({ value: stat.value, label: stat.label, order: stat.order });
  };

  const handleSave = async () => {
    const promise =
      editingId === "new"
        ? createStat.mutateAsync(form)
        : updateStat.mutateAsync({ id: editingId!, data: form });

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
    if (!window.confirm("Delete this stat?")) return;
    toast.promise(deleteStat.mutateAsync(id), {
      loading: "Deleting...",
      success: "Deleted!",
      error: "Failed to delete",
    });
  };

  const handleSaveBadge = async () => {
    if (!profile?.id) return;
    toast.promise(
      updateProfile.mutateAsync({
        id: profile.id,
        data: { ...profile, statusBadge: badgeValue },
      }),
      {
        loading: "Saving...",
        success: "Badge updated!",
        error: "Failed to update",
      },
    );
    setEditingBadge(false);
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      {/* Hero Badge */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Hero Status Badge</h2>
          <button
            onClick={() => {
              setBadgeValue(profile?.statusBadge || "");
              setEditingBadge(true);
            }}
            className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg text-xs"
          >
            Edit
          </button>
        </div>
        <div className="glass p-4 rounded-2xl border border-white/5">
          <p className="text-white font-medium">
            {profile?.statusBadge || (
              <span className="text-slate-500 italic">Not set</span>
            )}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black text-white">Home Stats</h1>
          <button
            onClick={openCreate}
            className="btn-primary px-6 py-2 rounded-xl text-sm"
          >
            + Add Stat
          </button>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat: HomeStat) => (
            <div
              key={stat.id}
              className="glass p-6 rounded-2xl border border-white/5"
            >
              <p className="text-3xl font-black text-white mb-1">
                {stat.value}
              </p>
              <p className="text-slate-400 text-sm">{stat.label}</p>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => openEdit(stat)}
                  className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-xs"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(stat.id)}
                  className="px-3 py-1 bg-red-500/10 text-red-400 rounded-lg text-xs"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stat Modal */}
      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId === "new" ? "Add Stat" : "Edit Stat"}
            </h2>
            <div className="space-y-4">
              <input
                placeholder='Value (e.g. "3.5+")'
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: e.target.value })}
              />
              <input
                placeholder='Label (e.g. "Years Experience")'
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                value={form.label}
                onChange={(e) => setForm({ ...form, label: e.target.value })}
              />
              <input
                type="number"
                placeholder="Order"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
                value={form.order}
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

      {/* Badge Modal */}
      {editingBadge && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-md w-full">
            <h2 className="text-2xl font-bold text-white mb-6">
              Edit Status Badge
            </h2>
            <input
              placeholder='e.g. "Open to opportunities"'
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              value={badgeValue}
              onChange={(e) => setBadgeValue(e.target.value)}
            />
            <div className="flex justify-end gap-4 mt-8">
              <button
                onClick={() => setEditingBadge(false)}
                className="text-slate-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveBadge}
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
