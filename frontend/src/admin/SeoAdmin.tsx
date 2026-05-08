import { useAllSeo, useUpsertSeo, type PageSeo } from "@app/api/hooks/useSeo";
import AdminLayout from "@app/admin/AdminLayout";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const PAGES: PageSeo["page"][] = ["home", "about", "contact", "projects"];

type SeoForm = Omit<PageSeo, "id">;

const buildEmpty = (page: PageSeo["page"]): SeoForm => ({
  page,
  title: "",
  description: "",
  keywords: "",
  path: `/${page === "home" ? "" : page}`,
});

export default function SeoAdmin() {
  const { data: seoList = [], isLoading } = useAllSeo();
  const upsert = useUpsertSeo();

  const [activeTab, setActiveTab] = useState<PageSeo["page"]>("home");
  const [form, setForm] = useState<SeoForm>(buildEmpty("home"));

  const currentSeo = seoList.find((s) => s.page === activeTab);

  useEffect(() => {
    setForm(
      currentSeo
        ? {
            page: currentSeo.page,
            title: currentSeo.title,
            description: currentSeo.description,
            keywords: currentSeo.keywords,
            path: currentSeo.path,
          }
        : buildEmpty(activeTab),
    );
  }, [activeTab, seoList]);

  const handleSave = async () => {
    toast.promise(upsert.mutateAsync(form), {
      loading: "Saving SEO...",
      success: "SEO updated!",
      error: (err: any) =>
        err.response?.data?.errors?.map((e: any) => e.message).join(", ") ||
        "Failed to save",
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
      <div className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">SEO Management</h1>
        <p className="text-slate-400 text-sm">
          Manage SEO metadata for each page
        </p>
      </div>

      {/* Page tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {PAGES.map((p) => {
          const hasSeo = seoList.some((s) => s.page === p);
          return (
            <button
              key={p}
              onClick={() => setActiveTab(p)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all flex items-center gap-2 ${
                activeTab === p
                  ? "bg-primary-600 text-white"
                  : "glass text-slate-400 hover:text-white"
              }`}
            >
              {p}
              {hasSeo && (
                <span className="w-1.5 h-1.5 rounded-full bg-accent-400" />
              )}
            </button>
          );
        })}
      </div>

      {/* Form */}
      <div className="glass rounded-3xl border border-white/5 p-8 max-w-2xl space-y-5">
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Title</label>
          <input
            placeholder="Page title (shown in browser tab & search results)"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Meta description (150–160 chars recommended)"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <p className="text-slate-600 text-xs mt-1">
            {form.description.length} chars
          </p>
        </div>
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">
            Keywords
          </label>
          <textarea
            rows={2}
            placeholder="Comma-separated keywords"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white resize-none"
            value={form.keywords}
            onChange={(e) => setForm({ ...form, keywords: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-slate-400 text-xs mb-1.5">Path</label>
          <input
            placeholder="/about"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white"
            value={form.path}
            onChange={(e) => setForm({ ...form, path: e.target.value })}
          />
        </div>
        <div className="flex justify-end pt-2">
          <button
            onClick={handleSave}
            disabled={upsert.isPending}
            className="btn-primary px-8 py-3 rounded-xl"
          >
            {upsert.isPending ? "Saving..." : "Save SEO"}
          </button>
        </div>
      </div>
    </AdminLayout>
  );
}
