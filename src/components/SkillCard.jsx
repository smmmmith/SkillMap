import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import SkillTree from './SkillTree';
import PracticeLog from './PracticeLog';

const SkillCard = ({ skill, markSubSkillCompleted, logPractice, showLearningMaterials, markSkillMastered }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card key={skill.id} className="mb-4 skeuomorphic-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">{skill.name}</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neuyellow hover:text-neuyellow-light"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
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
        {isExpanded && (
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
                <div className="flex justify-between items-center mt-4">
                  <Button 
                    className="skeuomorphic-button"
                    onClick={() => logPractice(skill)}
                  >
                    Log Practice
                  </Button>
                  <Button 
                    className="skeuomorphic-button"
                    onClick={() => markSkillMastered(skill.id)}
                  >
                    Completed Independently
                  </Button>
                </div>
              </>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default SkillCard;