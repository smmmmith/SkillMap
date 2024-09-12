import { supabase } from '../integrations/supabase/supabase';

export const fetchSkillsFromSupabase = async () => {
  const { data, error } = await supabase
    .from('skills')
    .select('*');
  
  if (error) {
    console.error('Error fetching skills:', error);
    return [];
  }
  
  return data;
};

export const calculateSkillProgress = (skill) => {
  if (!skill.levels) return 0;
  const totalSubSkills = skill.levels.reduce((total, level) => total + (level.subSkills?.length || 0), 0);
  const completedSubSkills = skill.levels.reduce((total, level) => 
    total + (level.subSkills?.filter(subSkill => subSkill.completed)?.length || 0), 0);
  return totalSubSkills > 0 ? Math.round((completedSubSkills / totalSubSkills) * 100) : 0;
};