import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { toast } from "sonner";
import PracticeLogModal from './PracticeLogModal';
import SkillCard from './SkillCard';
import MasteredSkills from './MasteredSkills';
import AdditionalSkills from './AdditionalSkills';
import { getInitialSkills, getAdditionalSkills } from '../utils/skillUtils';

const SkillMap = () => {
  const [skills, setSkills] = useState([]);
  const [additionalSkills, setAdditionalSkills] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

  useEffect(() => {
    const selectedGoals = JSON.parse(localStorage.getItem('selectedGoals') || '[]');
    const initialSkills = getInitialSkills(selectedGoals);
    setSkills(initialSkills);
    setAdditionalSkills(getAdditionalSkills(selectedGoals));
  }, []);

  const markSubSkillCompleted = (skillId, subSkillId) => {
    setSkills(skills.map(skill => {
      if (skill.id === skillId) {
        const updatedSubSkills = skill.subSkills.map(subSkill => 
          subSkill.id === subSkillId ? { ...subSkill, completed: true } : subSkill
        );
        const completedCount = updatedSubSkills.filter(subSkill => subSkill.completed).length;
        const newProgress = Math.round((completedCount / skill.subSkills.length) * 100);
        return { ...skill, subSkills: updatedSubSkills, progress: newProgress };
      }
      return skill;
    }));
  };

  const logPractice = (skill) => {
    setCurrentSkill(skill);
    setIsLogModalOpen(true);
  };

  const handleLogSubmit = (supportLevel, successRating) => {
    setSkills(skills.map(skill => {
      if (skill.id === currentSkill.id) {
        return {
          ...skill,
          practiceLog: [
            ...skill.practiceLog,
            { date: new Date(), supportLevel, successRating }
          ]
        };
      }
      return skill;
    }));
    setIsLogModalOpen(false);
  };

  const markSkillMastered = (skillId) => {
    setSkills(skills.map(skill => 
      skill.id === skillId ? { ...skill, mastered: true, progress: 100 } : skill
    ));
    toast.success(`Congratulations! You've mastered ${skills.find(s => s.id === skillId).name}!`);
  };

  const showLearningMaterials = (skillId, subSkillId) => {
    const skill = skills.find(s => s.id === skillId);
    const subSkill = skill.subSkills.find(ss => ss.id === subSkillId);
    toast.info(`Showing learning materials for ${subSkill.name} in ${skill.name}`);
  };

  const addSkillToMap = (skillToAdd) => {
    setSkills([...skills, skillToAdd]);
    setAdditionalSkills(additionalSkills.filter(skill => skill.id !== skillToAdd.id));
    toast.success(`${skillToAdd.name} has been added to your SkillMap!`);
  };

  const activeSkills = skills.filter(skill => !skill.mastered);
  const masteredSkills = skills.filter(skill => skill.mastered);

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
      
      <AdditionalSkills skills={additionalSkills} addSkillToMap={addSkillToMap} />

      <PracticeLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default SkillMap;