import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

export interface PageSeo {
  id?: string;
  page: "home" | "about" | "contact" | "projects" | "skills";
  title: string;
  description: string;
  keywords: string;
  path: string;
}

export const useAllSeo = () =>
  useQuery<PageSeo[]>({
    queryKey: ["seo"],
    queryFn: async () => {
      const { data } = await api.get("/seo");
      return data;
    },
  });

export const usePageSeo = (page: PageSeo["page"]) =>
  useQuery<PageSeo | null>({
    queryKey: ["seo", page],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/seo/${page}`);
        return data;
      } catch {
        return null;
      }
    },
  });

export const useUpsertSeo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<PageSeo, "id">) => api.put("/seo", data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["seo"] });
    },
  });
};

export const useDeleteSeo = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (page: string) => api.delete(`/seo/${page}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["seo"] }),
  });
};
