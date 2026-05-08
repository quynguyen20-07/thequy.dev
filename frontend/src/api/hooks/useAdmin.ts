import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

// Admin Hooks - Projects
export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/projects", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put(`/projects/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/projects/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["projects"] }),
  });
};

// Admin Hooks - Experience
export const useCreateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => api.post("/experiences", data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

export const useUpdateExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put(`/experiences/${id}`, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

export const useDeleteExperience = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/experiences/${id}`),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["experiences"] }),
  });
};

// Admin Hooks - Profile
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      api.put(`/profile/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["profile"] }),
  });
};

// Admin Hooks - Skills
export const useCreateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { category: string; items: string[] }) =>
      api.post("/skills", data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: { category?: string; items?: string[] };
    }) => api.put(`/skills/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};

export const useDeleteSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/skills/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["skills"] }),
  });
};
