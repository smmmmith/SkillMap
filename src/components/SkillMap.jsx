import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import PracticeLogModal from './PracticeLogModal';
import SkillTree from './SkillTree';
import PracticeLog from './PracticeLog';
import { getInitialSkills } from '../utils/skillUtils';

const SkillMap = () => {
  const [skills, setSkills] = useState([]);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  const [isMasteredExpanded, setIsMasteredExpanded] = useState(false);

  useEffect(() => {
    const selectedGoals = JSON.parse(localStorage.getItem('selectedGoals') || '[]');
    const initialSkills = getInitialSkills(selectedGoals);
    setSkills(initialSkills);
  }, []);

  const toggleSkill = (skillId) => {
    setExpandedSkill(expandedSkill === skillId ? null : skillId);
  };

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

  const renderSkillCard = (skill) => (
    <Card key={skill.id} className="mb-4 skeuomorphic-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">{skill.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => toggleSkill(skill.id)}
          className="text-neuyellow hover:text-neuyellow-light"
        >
          {expandedSkill === skill.id ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="skeuomorphic-progress">
          <div
            className="skeuomorphic-progress-bar"
            style={{ width: `${skill.progress}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-300 mt-2">
          Progress: {skill.progress}%
        </p>
        {expandedSkill === skill.id && (
          <>
            <SkillTree
              skill={skill}
              markSubSkillCompleted={markSubSkillCompleted}
              logPractice={logPractice}
              showLearningMaterials={showLearningMaterials}
            />
            {skill.practiceLog.length > 0 && (
              <>
                <PracticeLog practiceLog={skill.practiceLog} />
                <Button 
                  className="mt-4 skeuomorphic-button"
                  onClick={() => markSkillMastered(skill.id)}
                >
                  Completed Independently
                </Button>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );

  const activeSkills = skills.filter(skill => !skill.mastered);
  const masteredSkills = skills.filter(skill => skill.mastered);

  return (
    <div className="container mx-auto p-4 bg-neugray min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 text-white">Your SkillMap</h1>
      
      {activeSkills.map(renderSkillCard)}

      {masteredSkills.length > 0 && (
        <Card className="mb-4 skeuomorphic-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold text-white">Mastered Skills</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMasteredExpanded(!isMasteredExpanded)}
              className="text-neuyellow hover:text-neuyellow-light"
            >
              {isMasteredExpanded ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          {isMasteredExpanded && (
            <CardContent>
              {masteredSkills.map((skill) => (
                <div key={skill.id} className="mb-2">
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                  <p className="text-sm text-gray-300">Mastered</p>
                </div>
              ))}
            </CardContent>
          )}
        </Card>
      )}

      <PracticeLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default SkillMap;