import { HomeIcon, LogInIcon, ClipboardCheckIcon, MapIcon, BookOpenIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Login from "./components/Login.jsx";
import AssessmentPage from "./components/AssessmentPage.jsx";
import SkillMap from "./components/SkillMap.jsx";
import IntroToSkillMap from "./components/IntroToSkillMap.jsx";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Login",
    to: "/login",
    icon: <LogInIcon className="h-4 w-4" />,
    page: <Login />,
  },
  {
    title: "Assessment",
    to: "/assessment",
    icon: <ClipboardCheckIcon className="h-4 w-4" />,
    page: <AssessmentPage />,
  },
  {
    title: "Intro to SkillMap",
    to: "/intro-to-skillmap",
    icon: <BookOpenIcon className="h-4 w-4" />,
    page: <IntroToSkillMap />,
  },
  {
    title: "SkillMap",
    to: "/skillmap",
    icon: <MapIcon className="h-4 w-4" />,
    page: <SkillMap />,
  },
];