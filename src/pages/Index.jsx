import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Welcome to SkillMap.io</h1>
        <p className="text-xl mb-8">Map your skills, achieve your goals</p>
        <Link to="/login">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-100">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;