import { useState, useEffect } from 'react';
import AdminLayout from '@app/admin/AdminLayout';
import { useQuery } from '@tanstack/react-query';
import { api } from '@app/api/axiosInstance';
import { useUpdateProfile } from '@app/api/hooks/useAdmin';
import { toast } from 'react-hot-toast';

export default function ProfileAdmin() {
  const { data: profile, isLoading } = useQuery<any>({
    queryKey: ['profile'],
    queryFn: () => api.get('/profile').then(res => res.data)
  });

  const updateMutation = useUpdateProfile();
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    if (profile) setFormData(profile);
  }, [profile]);

  const handleSave = async () => {
    const promise = updateMutation.mutateAsync({ id: profile.id, data: formData });
    toast.promise(promise, {
      loading: 'Updating profile...',
      success: 'Profile updated!',
      error: 'Failed to update profile',
    });
  };

  if (isLoading) return <AdminLayout><div>Loading...</div></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-3xl font-black text-white mb-8">Personal Profile</h1>
      <div className="glass p-8 rounded-3xl border border-white/5 max-w-2xl">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Name</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div>
              <label className="text-slate-400 text-sm mb-2 block">Role</label>
              <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" value={formData.role || ''} onChange={e => setFormData({...formData, role: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Email</label>
            <input className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white" value={formData.email || ''} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Bio</label>
            <textarea className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white h-32" value={formData.bio || ''} onChange={e => setFormData({...formData, bio: e.target.value})} />
          </div>
          <button onClick={handleSave} className="btn-primary w-full py-4 rounded-xl font-bold">Save Changes</button>
        </div>
      </div>
    </AdminLayout>
  );
}
