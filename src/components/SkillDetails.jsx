import React from 'react';
import { Button } from "@/components/ui/button";

const SkillDetails = ({ skill, markSubSkillCompleted, logPractice, showLearningMaterials }) => {
  const areAllSubSkillsCompleted = skill.subSkills.every(subSkill => subSkill.completed);

  return (
    <div className="mt-4">
      <h3 className="font-semibold mb-2">Sub-skills:</h3>
      <ul className="space-y-2">
        {skill.subSkills.map((subSkill) => (
          <li key={subSkill.id} className="flex items-center justify-between">
            <span>{subSkill.name}</span>
            <div className="space-x-2">
              {!subSkill.completed && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => showLearningMaterials(skill.id, subSkill.id)}
                >
                  Learning Materials
                </Button>
              )}
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
            </div>
          </li>
        ))}
      </ul>
      <Button 
        className="mt-4" 
        onClick={() => logPractice(skill)}
        disabled={!areAllSubSkillsCompleted}
      >
        Log Practice
      </Button>
    </div>
  );
};

export default SkillDetails;