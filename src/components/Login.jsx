import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // TODO: Implement actual login logic
    console.log('Login attempt with:', email, password);
    navigate('/assessment');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-appbg">
      <Card className="w-full max-w-md bg-[#2b2e33]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neuyellow">Login to SkillMap.io</CardTitle>
          <CardDescription className="text-gray-300">Enter your credentials to access your skill map</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="skeuomorphic-input"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="skeuomorphic-input"
              />
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button className="w-full skeuomorphic-button" onClick={handleLogin}>Log In</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;