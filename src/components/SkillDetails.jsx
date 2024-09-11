import React from 'react';
import { Button } from "@/components/ui/button";

const SkillDetails = ({ skill, markSubSkillCompleted, logPractice }) => {
  const areAllSubSkillsCompleted = skill.subSkills.every(subSkill => subSkill.completed);

  return (
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