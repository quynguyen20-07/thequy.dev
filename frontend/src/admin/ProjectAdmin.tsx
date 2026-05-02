import { useState } from 'react';
import AdminLayout from '@app/admin/AdminLayout';
import { useProjects } from '@app/api/hooks/useProjects';
import { useCreateProject, useUpdateProject, useDeleteProject } from '@app/api/hooks/useAdmin';
import { toast } from 'react-hot-toast';

export default function ProjectAdmin() {
  const { data: projects = [], isLoading } = useProjects();
  const createMutation = useCreateProject();
  const updateMutation = useUpdateProject();
  const deleteMutation = useDeleteProject();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleSave = async () => {
    const promise = editingId === 'new'
      ? createMutation.mutateAsync(formData)
      : updateMutation.mutateAsync({ id: editingId!, data: formData });

    toast.promise(promise, {
      loading: 'Saving project...',
      success: 'Project saved successfully!',
      error: (err: any) => {
        const data = err.response?.data;
        if (data?.errors && Array.isArray(data.errors)) {
          return data.errors.map((e: any) => e.message).join(', ');
        }
        return data?.message || 'Failed to save project';
      },
    });



    try {
      await promise;
      setEditingId(null);
    } catch (e) { }
  };

  const handleEdit = (project: any) => {
    setEditingId(project.id);
    setFormData(project);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const promise = deleteMutation.mutateAsync(id);
      toast.promise(promise, {
        loading: 'Deleting project...',
        success: 'Deleted successfully!',
        error: 'Failed to delete project',
      });
    }
  };


  if (isLoading) return <AdminLayout><div>Loading projects...</div></AdminLayout>;

  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-black text-white">Manage Projects</h1>
        <button
          onClick={() => { setEditingId('new'); setFormData({}); }}
          className="btn-primary px-6 py-2 rounded-xl text-sm"
        >
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {projectList.map((project: any) => (
          <div key={project.id} className="glass p-6 rounded-2xl border border-white/5 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white">{project.title}</h3>
              <p className="text-slate-400 text-sm">{project.company} • {project.period}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(project)} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30">Edit</button>
              <button onClick={() => handleDelete(project.id)} className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {editingId && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-slate-900 border border-white/10 p-8 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">
              {editingId === 'new' ? 'Create Project' : 'Edit Project'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {/* Basic Fields */}
              <input
                placeholder="Title"
                value={formData.title || ''}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              />
              <input
                placeholder="Slug"
                value={formData.slug || ''}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              />
              <input
                placeholder="Company"
                value={formData.company || ''}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              />
              <input
                placeholder="Period"
                value={formData.period || ''}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="bg-white/5 border border-white/10 rounded-xl p-3 text-white"
              />
            </div>

            <div className="flex justify-end gap-4">
              <button onClick={() => setEditingId(null)} className="px-6 py-2 text-slate-400">Cancel</button>
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
