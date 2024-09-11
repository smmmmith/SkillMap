import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";

const AdditionalSkills = ({ skills, addSkillToMap }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (skills.length === 0) return null;

  return (
    <Card className="mb-4 skeuomorphic-card bg-neugray-dark">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">Additional Skills</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-neuyellow hover:text-neuyellow-light"
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </CardHeader>
      {isExpanded && (
        <CardContent>
          {skills.map((skill) => (
            <div key={skill.id} className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <Button 
                size="sm"
                onClick={() => addSkillToMap(skill)}
                className="skeuomorphic-button"
              >
                <Plus className="mr-2 h-4 w-4" /> Add to SkillMap
              </Button>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default AdditionalSkills;