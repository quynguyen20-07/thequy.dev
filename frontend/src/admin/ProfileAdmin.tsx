import { useUpdateProfile } from "@app/api/hooks/useAdmin";
import FloatTextarea from "@app/components/FloatTextarea";
import FloatField from "@app/components/FloatField";
import AdminLayout from "@app/admin/AdminLayout";
import { useQuery } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

export default function ProfileAdmin() {
  const { data: profile, isLoading } = useQuery<any>({
    queryKey: ["profile"],
    queryFn: () => api.get("/profile").then((res) => res.data),
  });

  const updateMutation = useUpdateProfile();
  const [formData, setFormData] = useState<any>({});
  const [bioParagraphs, setBioParagraphs] = useState<string[]>([""]);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
      setBioParagraphs(
        profile.bioParagraphs?.length ? profile.bioParagraphs : [""],
      );
    }
  }, [profile]);

  const handleSave = async () => {
    const promise = updateMutation.mutateAsync({
      id: profile.id,
      data: { ...formData, bioParagraphs: bioParagraphs.filter(Boolean) },
    });
    toast.promise(promise, {
      loading: "Updating profile...",
      success: "Profile updated!",
      error: "Failed to update profile",
    });
  };

  const addParagraph = () => setBioParagraphs([...bioParagraphs, ""]);
  const removeParagraph = (i: number) =>
    setBioParagraphs(bioParagraphs.filter((_, idx) => idx !== i));
  const updateParagraph = (i: number, val: string) => {
    const next = [...bioParagraphs];
    next[i] = val;
    setBioParagraphs(next);
  };

  if (isLoading)
    return (
      <AdminLayout>
        <div>Loading...</div>
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <h1 className="text-3xl font-black text-white mb-8">Personal Profile</h1>
      <div className="glass p-8 rounded-3xl border border-white/5 max-w-2xl">
        <div className="space-y-6">
          <FloatField
            label="Avatar URL"
            value={formData.avatar || ""}
            onChange={(e) =>
              setFormData({ ...formData, avatar: e.target.value })
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatField
              label="Name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
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
          </div>

          <FloatField
            label="Status Badge"
            value={formData.statusBadge || ""}
            onChange={(e) =>
              setFormData({ ...formData, statusBadge: e.target.value })
            }
          />

          <FloatField
            label="Email"
            value={formData.email || ""}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            type="email"
            required
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatField
              label="Phone Number"
              value={formData.phone || ""}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <FloatField
              label="Location"
              value={formData.location || ""}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FloatField
              label="GitHub URL"
              value={formData.github || ""}
              onChange={(e) =>
                setFormData({ ...formData, github: e.target.value })
              }
            />

            <FloatField
              label="LinkedIn URL"
              value={formData.linkedin || ""}
              onChange={(e) =>
                setFormData({ ...formData, linkedin: e.target.value })
              }
            />
          </div>

          <FloatField
            label="Resume/CV URL"
            value={formData.resume || ""}
            onChange={(e) =>
              setFormData({ ...formData, resume: e.target.value })
            }
          />

          <FloatTextarea
            label="Short Bio"
            value={formData.bio || ""}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            required
            rows={3}
          />

          {/* Bio Paragraphs (About page) */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-slate-400 text-sm">
                About Page Bio Paragraphs
              </label>
              <button
                type="button"
                onClick={addParagraph}
                className="text-xs px-3 py-1 bg-primary-600/20 text-primary-400 rounded-lg"
              >
                + Add paragraph
              </button>
            </div>
            <div className="space-y-3">
              {bioParagraphs.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <textarea
                    rows={3}
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
                    placeholder={`Paragraph ${i + 1}`}
                    value={p}
                    onChange={(e) => updateParagraph(i, e.target.value)}
                  />
                  {bioParagraphs.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(i)}
                      className="px-3 py-2 bg-red-500/10 text-red-400 rounded-lg text-xs self-start"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleSave}
            className="btn-primary w-full py-4 rounded-xl font-bold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
