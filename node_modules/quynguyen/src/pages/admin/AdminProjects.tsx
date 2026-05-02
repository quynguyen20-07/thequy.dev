import { useState } from 'react';
import { useProjects, useCreateProject } from '../../api/hooks/useProjects';

export default function AdminProjects() {
  const { data: projects, isLoading } = useProjects();
  const createProject = useCreateProject();
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    createProject.mutate({
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      company,
      role: 'Full-Stack Developer',
      period: 'Present',
      shortDescription: 'New Project',
      description: 'New Project Description',
      responsibilities: [],
      achievements: [],
      tech: [],
      category: 'Other',
      featured: false,
      color: 'from-gray-500 to-gray-700',
      icon: '🚀',
      link: null
    }, {
      onSuccess: () => {
        alert('Project created successfully!');
        setTitle('');
        setCompany('');
      }
    });
  };

  if (isLoading) return <div className="p-8 text-white">Loading projects...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-white mb-8">Manage Projects</h1>
      
      <form onSubmit={handleCreate} className="mb-8 p-6 bg-white/5 rounded-2xl border border-white/10 glass">
        <h2 className="text-xl text-white font-bold mb-4">Add New Project</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Project Title"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
          <input 
            value={company} 
            onChange={(e) => setCompany(e.target.value)} 
            placeholder="Company Name"
            required
            className="bg-dark-800/50 border border-white/10 p-3 rounded-xl text-white focus:border-primary-500 outline-none"
          />
        </div>
        <button type="submit" className="btn-primary" disabled={createProject.isPending}>
          {createProject.isPending ? 'Saving...' : 'Add Project'}
        </button>
      </form>

      <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden glass">
        <table className="w-full text-left text-slate-300">
          <thead className="bg-white/5 border-b border-white/10">
            <tr>
              <th className="p-4 font-semibold text-white">Project Title</th>
              <th className="p-4 font-semibold text-white">Company</th>
              <th className="p-4 font-semibold text-white">Category</th>
              <th className="p-4 font-semibold text-white text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map(p => (
              <tr key={p.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                <td className="p-4 text-white font-medium">{p.title}</td>
                <td className="p-4">{p.company}</td>
                <td className="p-4"><span className="tag-accent text-xs">{p.category}</span></td>
                <td className="p-4 text-right">
                  <button className="text-blue-400 hover:text-blue-300 mr-4 text-sm font-medium transition-colors">Edit</button>
                  <button className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors">Delete</button>
                </td>
              </tr>
            ))}
            {(!projects || projects.length === 0) && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
