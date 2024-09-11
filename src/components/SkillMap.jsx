import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, ChevronUp } from "lucide-react";

const mockSkills = [
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
  },
];

const SkillMap = () => {
  const [skills, setSkills] = useState(mockSkills);
  const [expandedSkill, setExpandedSkill] = useState(null);

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

  const logPractice = (skillId) => {
    console.log(`Logging practice for skill ${skillId}`);
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
            <p className="text-sm text-gray-500 mt-2">Progress: {skill.progress}%</p>
            {expandedSkill === skill.id && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Sub-skills:</h3>
                <ul className="space-y-2">
                  {skill.subSkills.map((subSkill) => (
                    <li key={subSkill.id} className="flex items-center justify-between">
                      <span>{subSkill.name}</span>
                      {subSkill.completed ? (
                        <span className="text-green-500">Completed</span>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => markSubSkillCompleted(skill.id, subSkill.id)}
                        >
                          I Already Know This
                        </Button>
                      )}
                    </li>
                  ))}
                </ul>
                <Button className="mt-4" onClick={() => logPractice(skill.id)}>
                  Log Practice
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default SkillMap;