import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

const MasteredSkills = ({ skills }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (skills.length === 0) return null;

  return (
    <Card className="mb-4 skeuomorphic-card bg-green-900">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold text-white">Mastered Skills</CardTitle>
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
            <div key={skill.id} className="mb-2">
              <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
              <p className="text-sm text-gray-300">Mastered</p>
            </div>
          ))}
        </CardContent>
      )}
    </Card>
  );
};

export default MasteredSkills;