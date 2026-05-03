import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

// ============================================================================
// HIGHLIGHT HOOKS
// ============================================================================

export const useHighlights = () => {
  return useQuery({
    queryKey: ["highlights"],
    queryFn: async () => {
      const { data } = await api.get("/highlights");
      return data;
    },
  });
};

export const useCreateHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      icon: string;
      title: string;
      description: string;
      color: string;
      order?: number;
    }) => {
      const { data: result } = await api.post("/highlights", data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useUpdateHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        icon: string;
        title: string;
        description: string;
        color: string;
        order: number;
      }>;
    }) => {
      const { data: result } = await api.put(`/highlights/${id}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useDeleteHighlight = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/highlights/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

export const useReorderHighlights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: Array<{ id: string; order: number }>) => {
      const { data } = await api.post("/highlights/reorder", items);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["highlights"] });
    },
  });
};

// ============================================================================
// EDUCATION HOOKS
// ============================================================================

export const useEducation = () => {
  return useQuery({
    queryKey: ["education"],
    queryFn: async () => {
      const { data } = await api.get("/education");
      return data;
    },
  });
};

export const useCreateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      degree: string;
      institution: string;
      period: string;
      note: string;
      order?: number;
    }) => {
      const { data: result } = await api.post("/education", data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });
};

export const useUpdateEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{
        degree: string;
        institution: string;
        period: string;
        note: string;
        order: number;
      }>;
    }) => {
      const { data: result } = await api.put(`/education/${id}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });
};

export const useDeleteEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/education/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });
};

export const useReorderEducation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (items: Array<{ id: string; order: number }>) => {
      const { data } = await api.post("/education/reorder", items);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["education"] });
    },
  });
};
