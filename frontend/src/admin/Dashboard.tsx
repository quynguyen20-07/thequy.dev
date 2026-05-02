import AdminLayout from '@app/admin/AdminLayout';
import { useProjects } from '@app/api/hooks/useProjects';
import { useExperiences, useSkills } from '@app/api/hooks/useCommon';


export default function Dashboard() {
  const { data: projects = [] } = useProjects();
  const { data: experiences = [] } = useExperiences();
  const { data: skills = {} } = useSkills();

  const stats = [
    { label: 'Total Projects', value: Array.isArray(projects) ? projects.length : 0, color: 'text-blue-400' },
    { label: 'Experiences', value: Array.isArray(experiences) ? experiences.length : 0, color: 'text-purple-400' },
    { label: 'Skill Categories', value: Object.keys(skills).length, color: 'text-emerald-400' },
  ];

  return (
    <AdminLayout>
      <header className="mb-8">
        <h1 className="text-3xl font-black text-white mb-2">Overview</h1>
        <p className="text-slate-400">Welcome back, Admin.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="glass p-8 rounded-3xl border border-white/5 shadow-xl">
            <p className="text-slate-400 text-sm font-medium mb-2">{stat.label}</p>
            <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="glass rounded-3xl border border-white/5 overflow-hidden">
          <div className="p-8 text-slate-500 text-center">
            System logs and recent updates will appear here.
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
