import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SkillTree = ({ skill, markSubSkillCompleted, logPractice, showLearningMaterials }) => {
  return (
    <div className="mt-4">
      <div className="flex flex-col items-center">
        <Card className="w-40 mb-4 skeuomorphic-card">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-neuyellow">{skill.name}</h3>
            <p className="text-sm text-gray-300">Progress: {skill.progress}%</p>
          </CardContent>
        </Card>
        <div className="w-px h-8 bg-neuyellow"></div>
        <div className="flex justify-center space-x-4">
          {skill.subSkills.map((subSkill, index) => (
            <div key={subSkill.id} className="flex flex-col items-center">
              {index > 0 && <div className="w-8 h-px bg-neuyellow mb-4"></div>}
              <Card className={`w-32 mb-2 ${subSkill.completed ? 'bg-neuyellow' : 'skeuomorphic-card'}`}>
                <CardContent className="p-2 text-center">
                  <p className={`text-sm ${subSkill.completed ? 'text-neugray' : 'text-white'}`}>{subSkill.name}</p>
                </CardContent>
              </Card>
              <div className="flex flex-col space-y-2">
                {!subSkill.completed && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => showLearningMaterials(skill.id, subSkill.id)}
                    className="skeuomorphic-button-dark text-xs"
                  >
                    Learn
                  </Button>
                )}
                {!subSkill.completed && (
                  <Button
                    size="sm"
                    onClick={() => markSubSkillCompleted(skill.id, subSkill.id)}
                    className="skeuomorphic-button text-xs"
                  >
                    Complete
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 text-center">
        <Button 
          className="skeuomorphic-button" 
          onClick={() => logPractice(skill)}
          disabled={!skill.subSkills.every(subSkill => subSkill.completed)}
        >
          Log Practice
        </Button>
      </div>
    </div>
  );
};

export default SkillTree;