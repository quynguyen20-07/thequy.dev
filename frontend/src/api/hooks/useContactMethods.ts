import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

export interface ContactMethod {
  id: string;
  label: string;
  value: string;
  href: string;
  description: string;
  iconType: string;
  color: string;
  iconColor: string;
  order: number;
}

export const useContactMethods = () =>
  useQuery<ContactMethod[]>({
    queryKey: ["contactMethods"],
    queryFn: async () => {
      const { data } = await api.get("/contact/methods");
      return data;
    },
  });

export const useCreateContactMethod = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: Omit<ContactMethod, "id">) =>
      api.post("/contact/methods", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactMethods"] }),
  });
};

export const useUpdateContactMethod = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ContactMethod> }) =>
      api.put(`/contact/methods/${id}`, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactMethods"] }),
  });
};

export const useDeleteContactMethod = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/contact/methods/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["contactMethods"] }),
  });
};
