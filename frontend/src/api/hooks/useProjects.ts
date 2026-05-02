import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@app/api/axiosInstance';
import type { Project } from '@app/data/projects';

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data } = await api.get('/projects');
      return data;
    }
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: Partial<Project>) => {
      const { data } = await api.post('/projects', newProject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};
