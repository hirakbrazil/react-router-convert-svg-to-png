import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, MessageSquare } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <footer className="mt-8 space-y-4">
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
      
      <nav className="flex justify-center gap-6">
        {!isHomePage && (
          <Link to="/" className="inline-flex items-center gap-2 text-primary hover:underline">
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}
        <Link to="/about" className="inline-flex items-center gap-2 text-primary hover:underline">
          <Info className="h-4 w-4" />
          About
        </Link>
        <Link to="/feedback" className="inline-flex items-center gap-2 text-primary hover:underline">
          <MessageSquare className="h-4 w-4" />
          Feedback
        </Link>
      </nav>

      <div className="text-center text-sm text-muted-foreground">
        Made with ❤️ by{" "}
        <a 
          href="https://mutualfundjournal.in/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Mutual Fund Journal
        </a>
      </div>
    </footer>
  );
};

export default Footer;