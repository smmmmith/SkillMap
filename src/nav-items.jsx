import { HomeIcon, LogInIcon, ClipboardCheckIcon } from "lucide-react";
import Index from "./pages/Index.jsx";
import Login from "./components/Login.jsx";
import AssessmentPage from "./components/AssessmentPage.jsx";

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
];