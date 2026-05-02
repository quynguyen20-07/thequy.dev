import { useQuery } from '@tanstack/react-query';
import { api } from '../axiosInstance';
import type { Skills, Experience } from '../../data/projects';

export const useExperiences = () => {
  return useQuery<Experience[]>({
    queryKey: ['experiences'],
    queryFn: async () => {
      const { data } = await api.get('/experiences');
      return data;
    }
  });
};

export const useSkills = () => {
  return useQuery<Skills>({
    queryKey: ['skills'],
    queryFn: async () => {
      const { data } = await api.get('/skills');
      return data;
    }
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data } = await api.get('/profile');
      return data;
    }
  });
};
