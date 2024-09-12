import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fetchSkills = async () => {
  try {
    const { data, error } = await supabase.from('skills').select('*');
    if (error) {
      if (error.code === '42P01') {
        console.warn('Skills table does not exist. Returning empty array.');
        return [];
      }
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
};

export const useSkills = () => useQuery({
  queryKey: ['skills'],
  queryFn: fetchSkills,
});

export const useUpdateSkill = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updateData }) => {
      try {
        const { data, error } = await supabase
          .from('skills')
          .update(updateData)
          .eq('id', id)
          .single();
        if (error) {
          if (error.code === '42P01') {
            console.warn('Skills table does not exist. Update operation skipped.');
            return null;
          }
          throw new Error(error.message);
        }
        return data;
      } catch (error) {
        console.error('Error updating skill:', error);
        return null;
      }
    },
    onSuccess: (data) => {
      if (data !== null) {
        queryClient.invalidateQueries('skills');
      }
    },
  });
};

// Dummy data for skills when the table doesn't exist
const dummySkills = [
  {
    id: 1,
    name: 'Budgeting',
    progress: 0,
    mastered: false,
    levels: [
      {
        id: 1,
        name: 'Basic',
        subSkills: [
          { id: 1, name: 'Track expenses', completed: false },
          { id: 2, name: 'Set financial goals', completed: false },
        ],
      },
    ],
    practiceLog: [],
  },
  {
    id: 2,
    name: 'Cooking',
    progress: 0,
    mastered: false,
    levels: [
      {
        id: 1,
        name: 'Beginner',
        subSkills: [
          { id: 1, name: 'Follow a simple recipe', completed: false },
          { id: 2, name: 'Use basic kitchen tools', completed: false },
        ],
      },
    ],
    practiceLog: [],
  },
];

// Function to get skills (either from Supabase or dummy data)
export const getSkills = async () => {
  const skills = await fetchSkills();
  return skills.length > 0 ? skills : dummySkills;
};