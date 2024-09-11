import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const lifeGoals = [
  { id: 'budgeting', label: 'Budgeting' },
  { id: 'socialSkills', label: 'Social Skills' },
  { id: 'cooking', label: 'Cooking' },
  { id: 'fitness', label: 'Fitness' },
  { id: 'timeManagement', label: 'Time Management' },
];

const AssessmentPage = () => {
  const [selectedGoals, setSelectedGoals] = useState([]);
  const navigate = useNavigate();

  const handleGoalToggle = (goalId) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('selectedGoals', JSON.stringify(selectedGoals));
    navigate('/intro-to-skillmap');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-appbg">
      <Card className="w-full max-w-md skeuomorphic-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neuyellow">Select Your Life Goals</CardTitle>
          <CardDescription className="text-gray-300">Choose the areas you want to improve in your life</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {lifeGoals.map((goal) => (
                <div key={goal.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={goal.id}
                    checked={selectedGoals.includes(goal.id)}
                    onCheckedChange={() => handleGoalToggle(goal.id)}
                    className="skeuomorphic-input"
                  />
                  <label
                    htmlFor={goal.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-white"
                  >
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full skeuomorphic-button" onClick={handleSubmit}>Submit Goals</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentPage;