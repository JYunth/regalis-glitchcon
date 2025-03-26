
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Footer = () => {
  const [developerMode, setDeveloperMode] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem('developerModeEnabled');
    if (storedValue !== null) {
      setDeveloperMode(storedValue === 'true');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('developerModeEnabled', String(developerMode));
  }, [developerMode]);

  return (
    <footer className="bg-warm-beige py-12 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center">
              <h2 className="text-deep-charcoal font-serif text-xl font-semibold">Regalis</h2>
            </Link>
            <p className="mt-4 text-deep-charcoal/70 text-sm">
              Elevating your financial journey with minimalist elegance and clarity.
            </p>
          </div>

          <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-deep-charcoal font-serif font-medium mb-4">Features</h3>
              <ul className="space-y-2">
                <li><Link to="/dashboard" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Dashboard</Link></li>
                <li><Link to="/budget" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Budgeting</Link></li>
                <li><Link to="/investments" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Investments</Link></li>
                <li><Link to="/chat" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">AI Assistant</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-deep-charcoal font-serif font-medium mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">About</a></li>
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Careers</a></li>
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Press</a></li>
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Contact</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-deep-charcoal font-serif font-medium mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Privacy</a></li>
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Terms</a></li>
                <li><a href="#" className="text-deep-charcoal/70 hover:text-soft-gold transition-colors text-sm">Security</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-subtle-gray/30 flex items-center justify-between">
          <p className="text-center text-deep-charcoal/50 text-sm">
            © {new Date().getFullYear()} Regalis. All rights reserved.
          </p>
          <div className="flex items-center space-x-2">
            <Label htmlFor="developer-mode" className="text-deep-charcoal/70 text-sm">Developer Mode:</Label>
            <Switch id="developer-mode" checked={developerMode} onCheckedChange={(checked) => setDeveloperMode(checked)} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
