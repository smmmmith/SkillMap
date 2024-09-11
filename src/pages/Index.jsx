import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neugray">
      <div className="text-center text-white skeuomorphic-card p-8">
        <h1 className="text-5xl font-bold mb-4 text-neuyellow">Welcome to SkillMap.io</h1>
        <p className="text-xl mb-8">Map your skills, achieve your goals</p>
        <Link to="/login">
          <Button size="lg" className="skeuomorphic-button">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Index;