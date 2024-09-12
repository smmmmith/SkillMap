import React, { useState, useEffect } from 'react';
import { toast } from "sonner";
import PracticeLogModal from './PracticeLogModal';
import SkillCard from './SkillCard';
import MasteredSkills from './MasteredSkills';
import AdditionalSkills from './AdditionalSkills';
import { calculateSkillProgress } from '../utils/skillUtils';
import { useSkills, useUpdateSkill } from '../integrations/supabase/hooks/skillHooks';

const SkillMap = () => {
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const { data: skills, isLoading, error } = useSkills();
  const updateSkillMutation = useUpdateSkill();

  if (isLoading) return <div>Loading skills...</div>;
  if (error) return <div>Error loading skills: {error.message}</div>;

  const activeSkills = skills?.filter(skill => !skill.mastered) || [];
  const masteredSkills = skills?.filter(skill => skill.mastered) || [];

  const markSubSkillCompleted = (skillId, subSkillId) => {
    const updatedSkill = skills.find(skill => skill.id === skillId);
    if (!updatedSkill) return;

    const updatedLevels = updatedSkill.levels.map(level => ({
      ...level,
      subSkills: level.subSkills.map(subSkill =>
        subSkill.id === subSkillId ? { ...subSkill, completed: true } : subSkill
      )
    }));

    const newProgress = calculateSkillProgress({ ...updatedSkill, levels: updatedLevels });
    updateSkillMutation.mutate({ id: skillId, levels: updatedLevels, progress: newProgress });
  };

  const logPractice = (skill) => {
    setCurrentSkill(skill);
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = (supportLevel, successRating) => {
    if (!currentSkill) return;

    const updatedPracticeLog = [
      ...(currentSkill.practiceLog || []),
      { date: new Date(), supportLevel, successRating }
    ];

    updateSkillMutation.mutate({ 
      id: currentSkill.id, 
      practiceLog: updatedPracticeLog 
    });

    setIsLogModalOpen(false);
  };

  const markSkillMastered = (skillId) => {
    updateSkillMutation.mutate({ id: skillId, mastered: true, progress: 100 });
    const masteredSkill = skills.find(s => s.id === skillId);
    if (masteredSkill) {
      toast.success(`Congratulations! You've mastered ${masteredSkill.name}!`);
    }
  };

  const showLearningMaterials = (skillId, subSkillId) => {
    const skill = skills.find(s => s.id === skillId);
    if (skill) {
      const subSkill = skill.levels.flatMap(level => level.subSkills).find(ss => ss.id === subSkillId);
      if (subSkill) {
        toast.info(`Showing learning materials for ${subSkill.name} in ${skill.name}`);
      } else {
        toast.error("Sub-skill not found");
      }
    } else {
      toast.error("Skill not found");
    }
  };

  return (
    <div className="container mx-auto p-4 bg-appbg min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Your SkillMap</h1>
      
      {activeSkills.map(skill => (
        <SkillCard
          key={skill.id}
          skill={skill}
          markSubSkillCompleted={markSubSkillCompleted}
          logPractice={logPractice}
          showLearningMaterials={showLearningMaterials}
          markSkillMastered={markSkillMastered}
        />
      ))}

      <MasteredSkills skills={masteredSkills} />

      <PracticeLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default SkillMap;