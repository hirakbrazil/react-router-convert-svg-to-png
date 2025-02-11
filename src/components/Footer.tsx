
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Info, MessageSquare, Image } from "lucide-react";
import ThemeSwitcher from "./ThemeSwitcher";

const Footer = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isImageToClipboardPage = location.pathname === "/imagetoclipboard";
  const isAboutPage = location.pathname === "/about";
  const isFeedbackPage = location.pathname === "/feedback";

  return (
    <footer className="mt-8 space-y-8">
      <div className="flex justify-center">
        <ThemeSwitcher />
      </div>
      
      <nav className="flex justify-center gap-6">
        {!isHomePage && (
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
            <Home className="h-4 w-4" />
            Home
          </Link>
        )}
        {!isImageToClipboardPage && (
          <Link to="/imagetoclipboard" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
            <Image className="h-4 w-4" />
            Image to Clipboard
          </Link>
        )}
        {!isAboutPage && (
          <Link to="/about" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
            <Info className="h-4 w-4" />
            About
          </Link>
        )}
        {!isFeedbackPage && (
          <Link to="/feedback" className="inline-flex items-center gap-2 text-foreground hover:text-primary">
            <MessageSquare className="h-4 w-4" />
            Feedback
          </Link>
        )}
      </nav>

      <div className="text-center text-sm text-muted-foreground">
        Built with ❤️ by{" "}
        <a 
          href="https://toolyoulove.com/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          Tool You Love
        </a>
      </div>
    </footer>
  );
};

export default Footer;
