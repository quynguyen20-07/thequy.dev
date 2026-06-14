import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { SkillRecord, SkillInput, SkillMap } from "@app/api/types/skill";
import { api } from "@app/api/axiosInstance";

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC – grouped by category for client pages
// GET /api/skills  →  { Languages: [...], Backend: [...], ... }
// ─────────────────────────────────────────────────────────────────────────────
export const useSkillsMap = () =>
  useQuery<SkillMap>({
    queryKey: ["skills"],
    queryFn: async () => {
      const { data } = await api.get("/skills");
      return data;
    },
  });

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN – raw array (requires auth)
// GET /api/skills/raw  →  SkillRecord[]
// ─────────────────────────────────────────────────────────────────────────────
export const useSkillsRaw = () =>
  useQuery<SkillRecord[]>({
    queryKey: ["skills-raw"],
    queryFn: async () => {
      const { data } = await api.get("/skills/raw");
      return data;
    },
  });

// ─────────────────────────────────────────────────────────────────────────────
// ADMIN MUTATIONS
// ─────────────────────────────────────────────────────────────────────────────
export const useCreateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<SkillRecord, Error, SkillInput>({
    mutationFn: async (data) => {
      const { data: result } = await api.post("/skills", data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-raw"] });
    },
  });
};

export const useUpdateSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<SkillRecord, Error, { id: string; data: Partial<SkillInput> }>({
    mutationFn: async ({ id, data }) => {
      const { data: result } = await api.put(`/skills/${id}`, data);
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-raw"] });
    },
  });
};

export const useDeleteSkillMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/skills/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["skills"] });
      queryClient.invalidateQueries({ queryKey: ["skills-raw"] });
    },
  });
};
