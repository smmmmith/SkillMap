import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### untitled

| name       | type                     | format    | required |
|------------|--------------------------|-----------|----------|
| id         | integer                  | bigint    | true     |
| created_at | string                   | timestamp | true     |

Note: 
- 'id' is a Primary Key.
- 'created_at' has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useUntitled = () => useQuery({
    queryKey: ['untitled'],
    queryFn: () => fromSupabase(supabase.from('untitled').select('*')),
});

export const useUntitledById = (id) => useQuery({
    queryKey: ['untitled', id],
    queryFn: () => fromSupabase(supabase.from('untitled').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddUntitled = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newItem) => fromSupabase(supabase.from('untitled').insert([newItem])),
        onSuccess: () => {
            queryClient.invalidateQueries('untitled');
        },
    });
};

export const useUpdateUntitled = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => fromSupabase(supabase.from('untitled').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('untitled');
        },
    });
};

export const useDeleteUntitled = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('untitled').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('untitled');
        },
    });
};