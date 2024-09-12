import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fetchSkills = async () => {
  const { data, error } = await supabase.from('skills').select('*');
  if (error) throw new Error(error.message);
  return data;
};

export const useSkills = () => useQuery({
  queryKey: ['skills'],
  queryFn: fetchSkills,
});

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      const { data, error } = await supabase
        .from('skills')
        .update(updateData)
        .eq('id', id)
        .single();
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries('skills');
    },
  });
};