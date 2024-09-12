import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown } from "lucide-react";
import NotReadyDialog from './NotReadyDialog';

const SkillTree = ({ skill, markSubSkillCompleted, logPractice, showLearningMaterials }) => {
  const [isNotReadyDialogOpen, setIsNotReadyDialogOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);

  const handleNotReadyClick = () => {
    setIsNotReadyDialogOpen(true);
    if (currentLevel < skill.levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    }
  };

  const areAllSubSkillsCompleted = (level) => level.subSkills.every(subSkill => subSkill.completed);
  const isLastLevel = currentLevel === skill.levels.length - 1;

  const renderSubSkills = (level) => (
    <div className="flex justify-center items-center space-x-4 overflow-x-auto py-4">
      {level.subSkills.map((subSkill, index) => (
        <React.Fragment key={subSkill.id}>
          <div className="flex flex-col items-center">
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
          {index < level.subSkills.length - 1 && (
            <ArrowRight className="text-neuyellow" size={24} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col items-center">
        <Card className="w-40 mb-4 skeuomorphic-card">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-neuyellow">{skill.name}</h3>
          </CardContent>
        </Card>
        <div className="w-px h-8 bg-neuyellow"></div>
        {renderSubSkills(skill.levels[currentLevel])}
      </div>
      {areAllSubSkillsCompleted(skill.levels[currentLevel]) && !isLastLevel && (
        <div className="mt-4 text-center space-x-4">
          <Button 
            className="skeuomorphic-button" 
            onClick={() => logPractice(skill)}
          >
            Log Practice
          </Button>
          <Button 
            className="skeuomorphic-button-dark" 
            onClick={handleNotReadyClick}
          >
            Not Ready to Practice
          </Button>
        </div>
      )}
      {isLastLevel && areAllSubSkillsCompleted(skill.levels[currentLevel]) && (
        <div className="mt-4 text-center">
          <Button 
            className="skeuomorphic-button" 
            onClick={() => logPractice(skill)}
          >
            Log Practice
          </Button>
        </div>
      )}
      {currentLevel > 0 && (
        <div className="mt-8">
          <div className="w-px h-8 bg-neuyellow mx-auto"></div>
          <ArrowDown className="text-neuyellow mx-auto mb-4" size={24} />
          {renderSubSkills(skill.levels[currentLevel])}
        </div>
      )}
      <NotReadyDialog 
        isOpen={isNotReadyDialogOpen} 
        onClose={() => setIsNotReadyDialogOpen(false)} 
      />
    </div>
  );
};

export default SkillTree;