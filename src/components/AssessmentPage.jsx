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
    console.log('Selected goals:', selectedGoals);
    // TODO: Send selected goals to backend
    navigate('/skillmap'); // Redirect to SkillMap page (to be created)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Select Your Life Goals</CardTitle>
          <CardDescription>Choose the areas you want to improve in your life</CardDescription>
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
                  />
                  <label
                    htmlFor={goal.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {goal.label}
                  </label>
                </div>
              ))}
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>Submit Goals</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AssessmentPage;