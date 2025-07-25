
import React from "react";
import { Link, useLocation } from "react-router";
import { Home, Info, MessageSquare, Shield } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isAboutPage = location.pathname === "/about";
  const isFeedbackPage = location.pathname === "/feedback";
  const isPrivacyPage = location.pathname === "/privacy";

  return (
    <footer className="mt-8 space-y-8">
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
      
      <nav className="flex flex-wrap justify-center gap-x-6 gap-y-4">
        {!isHomePage && (
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap">
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}
        {!isAboutPage && (
          <Link to="/about" className="inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap">
            <Info className="h-4 w-4" />
            About
          </Link>
        )}
        {!isFeedbackPage && (
          <Link to="/feedback" className="inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
        )}
        {!isPrivacyPage && (
          <Link to="/privacy" className="inline-flex items-center gap-2 text-foreground hover:text-primary whitespace-nowrap">
            <Shield className="h-4 w-4" />
            Privacy
          </Link>
        )}
      </nav>
    </footer>
  );
};

export default Footer;
