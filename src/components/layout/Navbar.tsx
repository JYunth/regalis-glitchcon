import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { Menu, X } from "lucide-react";
import LoginSection from "../LoginSection.jsx";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLoginMessage, setShowLoginMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Transactions", path: "/transactions" },
    { name: "Budget", path: "/budget" },
    { name: "Investments", path: "/investments" },
    { name: "Insights", path: "/insights" },
    { name: "Chat", path: "/chat" },
    { name: "Settings", path: "/settings" },
  ];

  const handleNavClick = (path) => {
    if (isSignedIn) {
      navigate(path);
    } else {
      setShowLoginMessage(true);
      setTimeout(() => setShowLoginMessage(false), 2500);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-warm-beige/50 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className="text-deep-charcoal font-serif text-2xl font-semibold">
            Regalis
          </h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.path)}
              className={`text-sm font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-soft-gold border-b-2 border-soft-gold"
                  : "text-deep-charcoal hover:text-soft-gold"
              }`}
            >
              {link.name}
            </button>
          ))}
          <LoginSection />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-deep-charcoal focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.path)}
                className={`block w-full text-left px-4 py-2 text-base font-medium rounded-md transition-all duration-300 ${
                  location.pathname === link.path
                    ? "text-soft-gold bg-warm-beige/50"
                    : "text-deep-charcoal hover:bg-warm-beige/30"
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Login Prompt Message */}
      {showLoginMessage && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-deep-charcoal text-soft-gold px-4 py-2 rounded-lg shadow-lg backdrop-blur-md animate-fade-in">
          Please login for more experience
        </div>
      )}
    </nav>
  );
};

export default Navbar;
