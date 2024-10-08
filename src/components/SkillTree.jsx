import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import NotReadyDialog from './NotReadyDialog';

const SkillTree = ({ skill, markSubSkillCompleted, logPractice, showLearningMaterials, markSkillMastered }) => {
  const [isNotReadyDialogOpen, setIsNotReadyDialogOpen] = useState(false);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [hoveredSubSkill, setHoveredSubSkill] = useState(null);
  const [isLevelTwoVisible, setIsLevelTwoVisible] = useState(false);

  const handleNotReadyClick = () => {
    setIsNotReadyDialogOpen(true);
    if (skill.levels && currentLevel < skill.levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setIsLevelTwoVisible(true);
    }
  };

  const areAllSubSkillsCompleted = (level) => {
    return level && level.subSkills && level.subSkills.every(subSkill => subSkill.completed);
  };

  const isLastLevel = skill.levels && currentLevel === skill.levels.length - 1;

  const FloatingButtons = ({ subSkill }) => (
    <div 
      className="absolute z-10 bg-neugray-dark rounded-md shadow-lg p-2" 
      style={{ 
        minWidth: '120px', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        top: '100%',
        marginTop: '0px'
      }}
    >
      <Button
        size="sm"
        variant="outline"
        onClick={(e) => {
          e.stopPropagation();
          showLearningMaterials(skill.id, subSkill.id);
        }}
        className="skeuomorphic-button-dark text-xs mb-2 w-full"
      >
        Learning Materials
      </Button>
      <Button
        size="sm"
        onClick={(e) => {
          e.stopPropagation();
          markSubSkillCompleted(skill.id, subSkill.id);
        }}
        className="skeuomorphic-button text-xs w-full"
      >
        Already Know This
      </Button>
    </div>
  );

  const renderSubSkills = (level, isCompleted = false, levelIndex) => {
    if (!level || !level.subSkills) return null;

    const allCompleted = areAllSubSkillsCompleted(level);
    const marginClass = allCompleted ? 'mb-4' : 'mb-16';

    return (
      <div className={`flex flex-wrap justify-center items-start space-x-4 py-4 ${marginClass}`}>
        {level.subSkills.map((subSkill, index) => (
          <React.Fragment key={subSkill.id}>
            <div 
              className={`flex flex-col items-center relative`}
              onMouseEnter={() => setHoveredSubSkill(subSkill.id)}
              onMouseLeave={() => setHoveredSubSkill(null)}
            >
              <Card 
                className={`w-32 mb-2 cursor-pointer ${subSkill.completed || isCompleted ? 'bg-neuyellow' : 'skeuomorphic-card'}`}
              >
                <CardContent className="p-2 text-center">
                  <p className={`text-sm ${subSkill.completed || isCompleted ? 'text-neugray' : 'text-white'}`}>{subSkill.name}</p>
                </CardContent>
              </Card>
              {hoveredSubSkill === subSkill.id && !subSkill.completed && !isCompleted && (
                <FloatingButtons subSkill={subSkill} />
              )}
            </div>
            {index < level.subSkills.length - 1 && (
              <ArrowRight className="text-neuyellow mt-4" size={24} />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  if (!skill || !skill.levels || skill.levels.length === 0) {
    return <div>No skill data available</div>;
  }

  return (
    <div className="mt-4">
      <div className="flex flex-col items-center">
        <Card className="w-40 mb-4 skeuomorphic-card">
          <CardContent className="p-4 text-center">
            <h3 className="font-semibold text-neuyellow">{skill.name}</h3>
          </CardContent>
        </Card>
        <div className={`w-px ${isLevelTwoVisible ? 'h-4' : 'h-8'} bg-neuyellow`}></div>
        <div className="relative w-full">
          {skill.levels.map((level, index) => (
            <React.Fragment key={index}>
              {renderSubSkills(level, index < currentLevel, index)}
              {index < skill.levels.length - 1 && index <= currentLevel && (
                <div className="w-px h-8 bg-neuyellow mx-auto my-2"></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      {areAllSubSkillsCompleted(skill.levels[currentLevel]) && (
        <div className="mt-4 text-center space-x-4">
          <Button 
            className="skeuomorphic-button" 
            onClick={() => logPractice(skill)}
          >
            Log Practice
          </Button>
          <Button 
            className="skeuomorphic-button-dark" 
            onClick={() => markSkillMastered(skill.id)}
          >
            Completed Independently
          </Button>
          {!isLastLevel && (
            <Button 
              className="skeuomorphic-button-dark" 
              onClick={handleNotReadyClick}
            >
              Not Ready to Practice
            </Button>
          )}
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