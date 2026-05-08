import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

export interface HomeStat {
  id: string;
  value: string;
  label: string;
  order: number;
}

export const useHomeStats = () =>
  useQuery<HomeStat[]>({
    queryKey: ["homeStats"],
    queryFn: async () => {
      const { data } = await api.get("/home/stats");
      return data;
    },
  });

export const useCreateHomeStat = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<HomeStat, "id">) => api.post("/home/stats", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homeStats"] }),
  });
};

export const useUpdateHomeStat = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<HomeStat> }) =>
      api.put(`/home/stats/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homeStats"] }),
  });
};

export const useDeleteHomeStat = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/home/stats/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["homeStats"] }),
  });
};
