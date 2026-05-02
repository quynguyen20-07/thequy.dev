import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Project, CreateProjectInput } from "@app/api/types/project";
import { api } from "@app/api/axiosInstance";

type CreateProjectPayload = CreateProjectInput;

export const useProjects = () => {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: async () => {
      const { data } = await api.get("/projects");
      return data;
    },
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newProject: CreateProjectPayload) => {
      const { data } = await api.post("/projects", newProject);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
