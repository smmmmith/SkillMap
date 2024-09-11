import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const IntroToSkillMap = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const introCards = [
    {
      title: "Welcome to SkillMap",
      content: "SkillMap is your personalized journey to mastering life skills. Let's explore how it works!"
    },
    {
      title: "Skill Trees",
      content: "Your skills are organized into trees. Each tree represents a major life skill area you want to improve."
    },
    {
      title: "Sub-skills",
      content: "Within each skill tree, you'll find sub-skills. These are specific abilities that contribute to mastering the overall skill."
    },
    {
      title: "Progress Tracking",
      content: "As you learn and practice, you'll see your progress grow. Complete sub-skills to advance in your skill trees."
    },
    {
      title: "Practice Logging",
      content: "Regular practice is key. Log your practice sessions to track your improvement over time."
    }
  ];

  const handleNext = () => {
    if (currentCard < introCards.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      setIsLoading(true);
    }
  };

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        navigate('/skillmap');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-appbg p-4">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-4 text-white">Creating Your SkillMap</h2>
        <Loader2 className="w-16 h-16 animate-spin text-neuyellow mx-auto" />
      </div>

      <Card className="w-full max-w-md skeuomorphic-card">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-neuyellow">{introCards[currentCard].title}</h2>
          <p className="text-white mb-6">{introCards[currentCard].content}</p>
          <Button 
            onClick={handleNext} 
            className="w-full skeuomorphic-button"
            disabled={isLoading}
          >
            {currentCard < introCards.length - 1 ? "Next" : "Create My SkillMap"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntroToSkillMap;