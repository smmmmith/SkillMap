import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import PracticeLogModal from './PracticeLogModal';
import SkillDetails from './SkillDetails';
import PracticeLog from './PracticeLog';

const SkillMap = () => {
  const [skills, setSkills] = useState([
    {
      id: 1,
      name: "Cooking",
      progress: 30,
      subSkills: [
        { id: 11, name: "Meal Prep", completed: false },
        { id: 12, name: "Using Appliances", completed: true },
        { id: 13, name: "Basic Recipes", completed: false },
      ],
      practiceLog: [],
      mastered: false,
    },
    {
      id: 2,
      name: "Budgeting",
      progress: 50,
      subSkills: [
        { id: 21, name: "Expense Tracking", completed: true },
        { id: 22, name: "Creating a Budget", completed: false },
        { id: 23, name: "Saving Strategies", completed: true },
      ],
      practiceLog: [],
      mastered: false,
    },
  ]);
  const [expandedSkill, setExpandedSkill] = useState(null);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);

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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your SkillMap</h1>
      {skills.map((skill) => (
        <Card key={skill.id} className="mb-4">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">{skill.name}</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleSkill(skill.id)}
            >
              {expandedSkill === skill.id ? <ChevronUp /> : <ChevronDown />}
            </Button>
          </CardHeader>
          <CardContent>
            <Progress value={skill.progress} className="w-full" />
            <p className="text-sm text-gray-500 mt-2">
              Progress: {skill.progress}% {skill.mastered && "(Mastered)"}
            </p>
            {expandedSkill === skill.id && (
              <>
                <SkillDetails
                  skill={skill}
                  markSubSkillCompleted={markSubSkillCompleted}
                  logPractice={logPractice}
                />
                {skill.practiceLog.length > 0 && (
                  <>
                    <PracticeLog practiceLog={skill.practiceLog} />
                    {!skill.mastered && (
                      <Button 
                        className="mt-4" 
                        onClick={() => markSkillMastered(skill.id)}
                      >
                        Completed Independently
                      </Button>
                    )}
                  </>
                )}
              </>
            )}
          </CardContent>
        </Card>
      ))}
      <PracticeLogModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmit={handleLogSubmit}
      />
    </div>
  );
};

export default SkillMap;