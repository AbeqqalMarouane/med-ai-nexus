
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Brain, LogIn } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { text: "Home", path: "/" },
    { text: "Medical Chatbot", path: "/chatbot" },
    { text: "Image Analysis", path: "/image-analysis" },
    { text: "Find Doctors", path: "/doctors" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Brain className="h-8 w-8 text-primary" />
            <span className="font-bold text-xl font-montserrat">MedAI Nexus</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  className="text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {link.text}
                </Link>
              ))}
            </div>
            <Button asChild variant="outline" className="ml-4">
              <Link to="/login">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-foreground"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-3 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="block px-2 py-2 text-foreground/80 hover:text-primary transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.text}
              </Link>
            ))}
            <Button asChild variant="outline" className="w-full mt-3">
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
