import { useQuery } from "@tanstack/react-query";
import { api } from "@app/api/axiosInstance";

export interface ProfileData {
  id: string;
  name: string;
  role: string;
  bio: string;
  email: string;
  avatar?: string;
  phone?: string;
  location?: string;
  resume?: string;
  github?: string;
  linkedin?: string;
}

/**
 * Hook to fetch profile data (name, avatar, contact info)
 * Cached for 5 minutes to avoid excessive API calls
 */
export const useProfile = () => {
  return useQuery<ProfileData>({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await api.get("/profile");
      return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  });
};
